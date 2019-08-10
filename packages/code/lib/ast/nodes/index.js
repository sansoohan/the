// Code generated by coz. DO NOT EDIT.
/* eslint-disable */
/**
 * @access protected
 * @description ast node handlers
 * @memberOf module:@the-/code
 * @namespace ast.nodes
 */
'use strict'

const calcNumericOperationOnBinaryExpressionNode_ = require('./calcNumericOperationOnBinaryExpressionNode')
const cleanupEmptyArrayPatternParamsOnFunctionNode_ = require('./cleanupEmptyArrayPatternParamsOnFunctionNode')
const cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode_ = require('./cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode')
const cleanupEmptyObjectPatternParamsOnFunctionNode_ = require('./cleanupEmptyObjectPatternParamsOnFunctionNode')
const cleanupExtOnImportDeclarationNode_ = require('./cleanupExtOnImportDeclarationNode')
const cleanupExtOnRequireDeclarationArgumentNode_ = require('./cleanupExtOnRequireDeclarationArgumentNode')
const cleanupRedundantAliasOnObjectPatternNode_ = require('./cleanupRedundantAliasOnObjectPatternNode')
const cleanupRedundantArrayPatternOnArrayExpression_ = require('./cleanupRedundantArrayPatternOnArrayExpression')
const cleanupRedundantObjectPatternOnObjectExpression_ = require('./cleanupRedundantObjectPatternOnObjectExpression')
const cleanupRedundantQuoteOnObjectPatternNode_ = require('./cleanupRedundantQuoteOnObjectPatternNode')
const cleanupReturnAwaitOnFunctionNode_ = require('./cleanupReturnAwaitOnFunctionNode')
const cleanupUnusedArgumentsOnFunctionNode_ = require('./cleanupUnusedArgumentsOnFunctionNode')
const cleanupUnusedOnArrayPatternNode_ = require('./cleanupUnusedOnArrayPatternNode')
const cleanupUnusedOnImportNode_ = require('./cleanupUnusedOnImportNode')
const cleanupUnusedOnObjectPatternNode_ = require('./cleanupUnusedOnObjectPatternNode')
const cleanupUnusedOnVariableNode_ = require('./cleanupUnusedOnVariableNode')
const combineObjectPatternOnStatementNode_ = require('./combineObjectPatternOnStatementNode')
const combineOnVariableDeclarationNodes_ = require('./combineOnVariableDeclarationNodes')
const combinePropertiesOnObjectPattern_ = require('./combinePropertiesOnObjectPattern')
const commentModuleOnProgramNode_ = require('./commentModuleOnProgramNode')
const completeJSDocAnnotationsOnProgramNode_ = require('./completeJSDocAnnotationsOnProgramNode')
const findCJSExportsAssignmentsExpressionOnProgramNode_ = require('./findCJSExportsAssignmentsExpressionOnProgramNode')
const findJSDocAnnotationsInCommendNode_ = require('./findJSDocAnnotationsInCommendNode')
const findRequireDeclarationOnProgramNode_ = require('./findRequireDeclarationOnProgramNode')
const formatJSDocCommentOnCommentNode_ = require('./formatJSDocCommentOnCommentNode')
const mergeDuplicateImportOnProgramNode_ = require('./mergeDuplicateImportOnProgramNode')
const mergeStringConcatenateOnBinaryExpressionNode_ = require('./mergeStringConcatenateOnBinaryExpressionNode')
const modifyNodeDeprecatedOnRequireDeclaration_ = require('./modifyNodeDeprecatedOnRequireDeclaration')
const modifyToDestructorOnDeclarationNode_ = require('./modifyToDestructorOnDeclarationNode')
const normalizeAssignmentOnVariableDeclarationNode_ = require('./normalizeAssignmentOnVariableDeclarationNode')
const normalizeBinaryExpressionNode_ = require('./normalizeBinaryExpressionNode')
const normalizeFunctionReturnOnFunctionNode_ = require('./normalizeFunctionReturnOnFunctionNode')
const normalizeJSDocAnnotationsOnCommentNode_ = require('./normalizeJSDocAnnotationsOnCommentNode')
const normalizeKindOnVariableDeclarationNode_ = require('./normalizeKindOnVariableDeclarationNode')
const normalizeSrcPathOnImportDeclarationNode_ = require('./normalizeSrcPathOnImportDeclarationNode')
const normalizeSrcPathOnRequireArgumentNode_ = require('./normalizeSrcPathOnRequireArgumentNode')
const normalizeVariableDeclaratorOnStatementNode_ = require('./normalizeVariableDeclaratorOnStatementNode')
const sortAnnotationsOnCommentNode_ = require('./sortAnnotationsOnCommentNode')
const sortCasesOnSwitchStatementNode_ = require('./sortCasesOnSwitchStatementNode')
const sortExportNamedDeclarationsOnProgramNode_ = require('./sortExportNamedDeclarationsOnProgramNode')
const sortMethodsOnClassNode_ = require('./sortMethodsOnClassNode')
const sortPropertiesOnObjectNode_ = require('./sortPropertiesOnObjectNode')
const sortSpecifiersOnImportDeclarationNode_ = require('./sortSpecifiersOnImportDeclarationNode')
const spaceOnCommentNode_ = require('./spaceOnCommentNode')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.calcNumericOperationOnBinaryExpressionNode = calcNumericOperationOnBinaryExpressionNode_
exports.cleanupEmptyArrayPatternParamsOnFunctionNode = cleanupEmptyArrayPatternParamsOnFunctionNode_
exports.cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode = cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode_
exports.cleanupEmptyObjectPatternParamsOnFunctionNode = cleanupEmptyObjectPatternParamsOnFunctionNode_
exports.cleanupExtOnImportDeclarationNode = cleanupExtOnImportDeclarationNode_
exports.cleanupExtOnRequireDeclarationArgumentNode = cleanupExtOnRequireDeclarationArgumentNode_
exports.cleanupRedundantAliasOnObjectPatternNode = cleanupRedundantAliasOnObjectPatternNode_
exports.cleanupRedundantArrayPatternOnArrayExpression = cleanupRedundantArrayPatternOnArrayExpression_
exports.cleanupRedundantObjectPatternOnObjectExpression = cleanupRedundantObjectPatternOnObjectExpression_
exports.cleanupRedundantQuoteOnObjectPatternNode = cleanupRedundantQuoteOnObjectPatternNode_
exports.cleanupReturnAwaitOnFunctionNode = cleanupReturnAwaitOnFunctionNode_
exports.cleanupUnusedArgumentsOnFunctionNode = cleanupUnusedArgumentsOnFunctionNode_
exports.cleanupUnusedOnArrayPatternNode = cleanupUnusedOnArrayPatternNode_
exports.cleanupUnusedOnImportNode = cleanupUnusedOnImportNode_
exports.cleanupUnusedOnObjectPatternNode = cleanupUnusedOnObjectPatternNode_
exports.cleanupUnusedOnVariableNode = cleanupUnusedOnVariableNode_
exports.combineObjectPatternOnStatementNode = combineObjectPatternOnStatementNode_
exports.combineOnVariableDeclarationNodes = combineOnVariableDeclarationNodes_
exports.combinePropertiesOnObjectPattern = combinePropertiesOnObjectPattern_
exports.commentModuleOnProgramNode = commentModuleOnProgramNode_
exports.completeJSDocAnnotationsOnProgramNode = completeJSDocAnnotationsOnProgramNode_
exports.findCJSExportsAssignmentsExpressionOnProgramNode = findCJSExportsAssignmentsExpressionOnProgramNode_
exports.findJSDocAnnotationsInCommendNode = findJSDocAnnotationsInCommendNode_
exports.findRequireDeclarationOnProgramNode = findRequireDeclarationOnProgramNode_
exports.formatJSDocCommentOnCommentNode = formatJSDocCommentOnCommentNode_
exports.mergeDuplicateImportOnProgramNode = mergeDuplicateImportOnProgramNode_
exports.mergeStringConcatenateOnBinaryExpressionNode = mergeStringConcatenateOnBinaryExpressionNode_
exports.modifyNodeDeprecatedOnRequireDeclaration = modifyNodeDeprecatedOnRequireDeclaration_
exports.modifyToDestructorOnDeclarationNode = modifyToDestructorOnDeclarationNode_
exports.normalizeAssignmentOnVariableDeclarationNode = normalizeAssignmentOnVariableDeclarationNode_
exports.normalizeBinaryExpressionNode = normalizeBinaryExpressionNode_
exports.normalizeFunctionReturnOnFunctionNode = normalizeFunctionReturnOnFunctionNode_
exports.normalizeJSDocAnnotationsOnCommentNode = normalizeJSDocAnnotationsOnCommentNode_
exports.normalizeKindOnVariableDeclarationNode = normalizeKindOnVariableDeclarationNode_
exports.normalizeSrcPathOnImportDeclarationNode = normalizeSrcPathOnImportDeclarationNode_
exports.normalizeSrcPathOnRequireArgumentNode = normalizeSrcPathOnRequireArgumentNode_
exports.normalizeVariableDeclaratorOnStatementNode = normalizeVariableDeclaratorOnStatementNode_
exports.sortAnnotationsOnCommentNode = sortAnnotationsOnCommentNode_
exports.sortCasesOnSwitchStatementNode = sortCasesOnSwitchStatementNode_
exports.sortExportNamedDeclarationsOnProgramNode = sortExportNamedDeclarationsOnProgramNode_
exports.sortMethodsOnClassNode = sortMethodsOnClassNode_
exports.sortPropertiesOnObjectNode = sortPropertiesOnObjectNode_
exports.sortSpecifiersOnImportDeclarationNode = sortSpecifiersOnImportDeclarationNode_
exports.spaceOnCommentNode = spaceOnCommentNode_

module.exports = {
  calcNumericOperationOnBinaryExpressionNode: calcNumericOperationOnBinaryExpressionNode_,
  cleanupEmptyArrayPatternParamsOnFunctionNode: cleanupEmptyArrayPatternParamsOnFunctionNode_,
  cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode: cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode_,
  cleanupEmptyObjectPatternParamsOnFunctionNode: cleanupEmptyObjectPatternParamsOnFunctionNode_,
  cleanupExtOnImportDeclarationNode: cleanupExtOnImportDeclarationNode_,
  cleanupExtOnRequireDeclarationArgumentNode: cleanupExtOnRequireDeclarationArgumentNode_,
  cleanupRedundantAliasOnObjectPatternNode: cleanupRedundantAliasOnObjectPatternNode_,
  cleanupRedundantArrayPatternOnArrayExpression: cleanupRedundantArrayPatternOnArrayExpression_,
  cleanupRedundantObjectPatternOnObjectExpression: cleanupRedundantObjectPatternOnObjectExpression_,
  cleanupRedundantQuoteOnObjectPatternNode: cleanupRedundantQuoteOnObjectPatternNode_,
  cleanupReturnAwaitOnFunctionNode: cleanupReturnAwaitOnFunctionNode_,
  cleanupUnusedArgumentsOnFunctionNode: cleanupUnusedArgumentsOnFunctionNode_,
  cleanupUnusedOnArrayPatternNode: cleanupUnusedOnArrayPatternNode_,
  cleanupUnusedOnImportNode: cleanupUnusedOnImportNode_,
  cleanupUnusedOnObjectPatternNode: cleanupUnusedOnObjectPatternNode_,
  cleanupUnusedOnVariableNode: cleanupUnusedOnVariableNode_,
  combineObjectPatternOnStatementNode: combineObjectPatternOnStatementNode_,
  combineOnVariableDeclarationNodes: combineOnVariableDeclarationNodes_,
  combinePropertiesOnObjectPattern: combinePropertiesOnObjectPattern_,
  commentModuleOnProgramNode: commentModuleOnProgramNode_,
  completeJSDocAnnotationsOnProgramNode: completeJSDocAnnotationsOnProgramNode_,
  findCJSExportsAssignmentsExpressionOnProgramNode: findCJSExportsAssignmentsExpressionOnProgramNode_,
  findJSDocAnnotationsInCommendNode: findJSDocAnnotationsInCommendNode_,
  findRequireDeclarationOnProgramNode: findRequireDeclarationOnProgramNode_,
  formatJSDocCommentOnCommentNode: formatJSDocCommentOnCommentNode_,
  mergeDuplicateImportOnProgramNode: mergeDuplicateImportOnProgramNode_,
  mergeStringConcatenateOnBinaryExpressionNode: mergeStringConcatenateOnBinaryExpressionNode_,
  modifyNodeDeprecatedOnRequireDeclaration: modifyNodeDeprecatedOnRequireDeclaration_,
  modifyToDestructorOnDeclarationNode: modifyToDestructorOnDeclarationNode_,
  normalizeAssignmentOnVariableDeclarationNode: normalizeAssignmentOnVariableDeclarationNode_,
  normalizeBinaryExpressionNode: normalizeBinaryExpressionNode_,
  normalizeFunctionReturnOnFunctionNode: normalizeFunctionReturnOnFunctionNode_,
  normalizeJSDocAnnotationsOnCommentNode: normalizeJSDocAnnotationsOnCommentNode_,
  normalizeKindOnVariableDeclarationNode: normalizeKindOnVariableDeclarationNode_,
  normalizeSrcPathOnImportDeclarationNode: normalizeSrcPathOnImportDeclarationNode_,
  normalizeSrcPathOnRequireArgumentNode: normalizeSrcPathOnRequireArgumentNode_,
  normalizeVariableDeclaratorOnStatementNode: normalizeVariableDeclaratorOnStatementNode_,
  sortAnnotationsOnCommentNode: sortAnnotationsOnCommentNode_,
  sortCasesOnSwitchStatementNode: sortCasesOnSwitchStatementNode_,
  sortExportNamedDeclarationsOnProgramNode: sortExportNamedDeclarationsOnProgramNode_,
  sortMethodsOnClassNode: sortMethodsOnClassNode_,
  sortPropertiesOnObjectNode: sortPropertiesOnObjectNode_,
  sortSpecifiersOnImportDeclarationNode: sortSpecifiersOnImportDeclarationNode_,
  spaceOnCommentNode: spaceOnCommentNode_,
}
