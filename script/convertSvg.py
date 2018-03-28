
#coding=utf-8
#author tangzehua

import re
import os
import time
import json
import sys
import re
import traceback

js_temp = """import React from 'react';
import Svg, {Circle,Ellipse,G,TSpan,TextPath,Path,Polygon,Polyline,Line,Rect,Use,Image,Symbol,Defs,LinearGradient,RadialGradient,Stop,ClipPath} from 'react-native-svg';
module.exports = {%s
};"""

js_class = """\"%s\":({size})=>("""

#如果不想要系统用户名, 就再运行的时候传入第一个参数
author = os.environ.has_key("USER") and os.environ['USER'] or os.environ['USERNAME']

repUpper = {
    "stroke-width": "strokeWidth",
    "fill-rule": "fillRule"
}

def transKey (xml):
    for k,v in repUpper.items():
        xml = xml.replace(k, v)
    return xml

def translate (x, y):
    return "translateX={%s} translateY={%s}" % (x, y)

def scale (x, y):
    return "scaleX={%s} scaleY={%s}" % (x, y)

def rotate (x):
    return "rotate={%s}" % x

def transform (xml):
    v = getValue(xml, "transform")
    if v:
        if v.find(") ") == -1:
            xml = setValue(xml, 'transform', eval(v)).replace("transform=", "")
        else:
            trans = ""
            for s in v.split(") "):
                if s and s.strip() != '':
                    trans += eval(s + (s.find(")") == -1 and ")" or "")) + " "
                print trans
            xml = setValue(xml, 'transform', trans).replace("transform=", "")
    return xml

def getValue (xml, name):
    l1 = xml.find(name)
    if l1 != -1:
        s1 = xml[l1:]
        s2 = s1[s1.find("\"") + 1:]
        s3 = s2[: s2.find("\"")]
        return s3
    return None

def setValue (xml, name, val):
    l1 = xml.find(name)
    if l1 != -1:
        s1 = xml[l1:]
        s2 = s1[s1.find("\"") + 1:]
        s3 = s2[: s2.find("\"")]
        xml = xml.replace("%s=\"%s\"" % (name, s3), "%s=%s" % (name, val))
    return xml
    
def deleteKey (xml, name):
    l1 = xml.find(name)
    if l1 != -1:
        s1 = xml[l1:]
        s2 = s1[s1.find("\"") + 1:]
        s3 = s2[: s2.find("\"")]
        xml = xml.replace(" %s=\"%s\"" % (name, s3), "")
    return xml

def formateSvg (svg):
    l1 = svg.find("</")
    l2 = svg.find("<")
    if l1 != -1:
        l0 = l1 + 2
        svg = svg[0: l0] + svg[l0: l0 + 1].upper() + svg[l0 + 1:]
    
    if l2 != -1 and (l2 < l1 or l1 == -1):
        l0 = l2 + 1
        svg = svg[0: l0] + svg[l0: l0 + 1].upper() + svg[l0 + 1:]
        
    l3 = svg.find("></")
    if l3 != -1:
        svg = svg[0: l3] + "/>"
        
    if svg.find("<Svg") != -1:
        svg = setValue(svg, "width", "{size.width}")
        svg = setValue(svg, "height", "{size.height}")
    svg = deleteKey(svg, 'version')
    svg = deleteKey(svg, 'xmlns')
    svg = deleteKey(svg, 'xmlns:xlink')
    svg = deleteKey(svg, 'xlink:href')
    svg = transform(svg)
    svg = transKey(svg)
        
    return svg

def allChf (cpp, name):
    o = [ js_class % name ];
    cpp_file = open(cpp)
    flag = False
    try:
        fit = False
        m_n = cpp_file.read().split("\n")
        for lc in m_n:
            if lc.find("<?xml") == -1 and lc.find("<title") == -1 and lc.find("<desc") == -1 and lc.find("<!-- ") == -1:
                if lc.find("<mask") != -1:
                    fit = True
                if not fit:
                    lc = formateSvg(lc)                    
                    o.append("" + lc);
                if lc.find("</mask") != -1:
                    fit = False

        flag = True
        o.append("),")
    except Exception, e:
        print "替换失败: " + cpp, e
        pass
    finally:
        cpp_file.close()

    react = "\n"
    if flag :
        n_len = len(o)

        index = 0
        for s in o:
            index += 1
            if index != n_len:
                react += s.strip()
            else:
                react += s.strip()
    return react

def chf (cpp, name):
    o = [ js_temp ];
    cpp_file = open(cpp)
    flag = False
    try:
        fit = False
        m_n = cpp_file.read().split("\n")
        for lc in m_n:
            if lc.find("<?xml") == -1 and lc.find("<title") == -1 and lc.find("<desc") == -1 and lc.find("<!-- ") == -1:
                if lc.find("<mask") != -1:
                    fit = True
                if not fit:
                    lc = formateSvg(lc)                    
                    o.append("\t\t\t" + lc);
                if lc.find("</mask") != -1:
                    fit = False

        flag = True
        o.append("\t\t)")
        o.append("\t}")
        o.append("}")
    except Exception, e:
        print "替换失败: " + cpp, e
        pass
    finally:
        cpp_file.close()

    if flag :
        n_path = "/workspace/App/front-app/src/assets/icons"

        not os.path.exists(n_path) and os.makedirs(n_path)
        jn = n_path + "/"+ name + ".js"

        # print cpp, "=>", jn

        n_len = len(o)
        os.path.isfile(jn) and os.remove(jn)
        out = open(jn, "w")

        index = 0
        for s in o:
            index += 1
            if index != n_len:
                out.write(s + "\n")
            else:
                out.write(s)
        out.close()


def start ():
    json_path = "/workspace/App/front-app/docs/icons"
    list_dirs = os.walk(json_path)
    react = ""
    for root, dirs, files in list_dirs:
        for f in files:
            if f.find(".svg") != -1:
                print root, f
                react += allChf(os.path.join(root, f), f[0:f.find(".")])

    if react != '':
        n_path = "/workspace/App/front-app/src/assets/icons"

        not os.path.exists(n_path) and os.makedirs(n_path)
        jn = n_path + "/svg.js"
        os.path.isfile(jn) and os.remove(jn)
        out = open(jn, "w")
        out.write(js_temp % react)
        out.close()

#activity.json
#base.json
#competitors.json
#servbe.json
def main(argv):
    print "---------------start-----------------"
    start()
    print "----------------end------------------"



if __name__ == "__main__":
    main(sys.argv)


