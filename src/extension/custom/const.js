/* @flow*/

export type ConstantDefinition = {
    AUTO_MAIL: number, // 自动收邮件时间
}

const Constant: ConstantDefinition = {
    AUTO_MAIL: 1000 * 60 * 5,
};
export default Constant;