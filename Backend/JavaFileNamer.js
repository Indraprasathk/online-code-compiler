function extractClassName(javaCode) {
    const publicClassIndex = javaCode.indexOf('public class');
    if (publicClassIndex !== -1) {
      const classNameStart = publicClassIndex + 'public class'.length + 1;
      const classNameEnd = javaCode.indexOf('{', classNameStart);
      if (classNameEnd !== -1) {
        const className = javaCode.substring(classNameStart, classNameEnd).trim();
        return className;
      }
    }
    return null;
  }
  
  function generateJavaFileName(javaCode) {
    const className = extractClassName(javaCode);
    if (className) {
      return `${className}.java`;
    }
    return null;
  }
  
  module.exports = {
    generateJavaFileName,
  };