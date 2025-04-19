# prepend_to_file Tool Enhancement Plan

This document outlines the specific improvements needed to ensure our `prepend_to_file` tool implementation is fully consistent and robust compared to the existing `append_to_file` tool.

## 1. Success Message Verification

### Issues
- Some success messages may still reference "appending" instead of "prepending"
- User feedback may not clearly reflect the prepend operation

### Files to Modify
- `/Users/alex/git/Roo-Code/src/core/tools/prependToFileTool.ts`

### Specific Changes
- Line ~168: Verify success message text uses "prepended to" rather than "appended to"
```typescript
pushToolResult(`The content was successfully prepended to ${relPath.toPosix()}.${newProblemsMessage}`)
```

## 2. Example Enhancement

### Issues
- Current example could better represent primary use cases for prepending
- Should showcase license headers and import statements which are common prepend use cases

### Files to Modify
- `/Users/alex/git/Roo-Code/src/core/prompts/tools/prepend-to-file.ts`

### Specific Changes
- Update example to provide a more comprehensive license header example:
```typescript
<prepend_to_file>
<path>src/index.js</path>
<content>
/**
 * Copyright (c) 2025 Roo Veterinary Inc.
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

</content>
</prepend_to_file>
```

- Add a second example showing import statements:
```typescript
<prepend_to_file>
<path>src/components/Button.js</path>
<content>
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

</content>
</prepend_to_file>
```

## 3. Error Message Consistency

### Issues
- Error messages in tool might still reference "appending" operations
- Error recording might need proper tool name reference

### Files to Modify
- `/Users/alex/git/Roo-Code/src/core/tools/prependToFileTool.ts`

### Specific Changes
- Line ~177: Check handleError call references "prepending to file" not "appending to file"
```typescript
await handleError("prepending to file", error)
```

- Line ~96 & ~104: Update recordToolError references to use "prepend_to_file"
```typescript
cline.recordToolError("prepend_to_file")
```

## 4. Documentation Enhancement

### Issues
- Documentation references to file editing tools should include prepend alongside append
- Any usage guidance should account for this new tool option

### Files to Modify
- `/Users/alex/git/Roo-Code/src/core/prompts/sections/rules.ts`

### Specific Changes
- Enhance documentation in editing instructions to better distinguish when to use prepend vs append:

```typescript
"- The prepend_to_file tool adds content to the beginning of files, such as adding license headers, import statements, or configuration headers. This tool will always add the content at the beginning of the file, before any existing content.",
```

## 5. Additional Test Scenarios

### Issues
- Current tests cover basic functionality but could be enhanced for key use cases
- Should specifically test prepending to empty files and files with different line endings

### Files to Modify
- `/Users/alex/git/Roo-Code/src/core/tools/__tests__/prependToFileTool.test.ts`

### Specific Changes
- Add test for prepending license headers:
```typescript
it("should prepend license headers properly", async () => {
  // Setup
  mockDiffViewProvider.editType = "modify"
  mockDiffViewProvider.originalContent = "function main() {\n  console.log('Hello world');\n}"
  mockToolUse.params.content = "/**\n * Copyright (c) 2025 Roo Code\n * License: MIT\n */\n"

  // Execute
  await prependToFileTool(
    mockCline as unknown as Cline,
    mockToolUse,
    mockAskApproval as unknown as AskApproval,
    mockHandleError as unknown as HandleError,
    mockPushToolResult as unknown as PushToolResult,
    mockRemoveClosingTag as unknown as RemoveClosingTag,
  )

  // Verify
  expect(mockDiffViewProvider.update).toHaveBeenCalledWith(
    "/**\n * Copyright (c) 2025 Roo Code\n * License: MIT\n */\n\nfunction main() {\n  console.log('Hello world');\n}", 
    true
  )
})
```

- Add test for prepending to empty files:
```typescript
it("should handle prepending to empty files", async () => {
  // Setup
  mockDiffViewProvider.editType = "modify"
  mockDiffViewProvider.originalContent = ""
  mockToolUse.params.content = "// New content"

  // Execute
  await prependToFileTool(
    mockCline as unknown as Cline,
    mockToolUse,
    mockAskApproval as unknown as AskApproval,
    mockHandleError as unknown as HandleError,
    mockPushToolResult as unknown as PushToolResult,
    mockRemoveClosingTag as unknown as RemoveClosingTag,
  )

  // Verify
  expect(mockDiffViewProvider.update).toHaveBeenCalledWith("// New content", true)
})
```

- Add test for different line endings:
```typescript
it("should handle different line endings correctly", async () => {
  // Setup
  mockDiffViewProvider.editType = "modify"
  mockDiffViewProvider.originalContent = "existing content\r\nwith CRLF endings"
  mockToolUse.params.content = "new content"

  // Execute
  await prependToFileTool(
    mockCline as unknown as Cline,
    mockToolUse,
    mockAskApproval as unknown as AskApproval,
    mockHandleError as unknown as HandleError,
    mockPushToolResult as unknown as PushToolResult,
    mockRemoveClosingTag as unknown as RemoveClosingTag,
  )

  // Verify
  expect(mockDiffViewProvider.update).toHaveBeenCalledWith(
    "new content\nexisting content\r\nwith CRLF endings", 
    true
  )
})
```

## Implementation Timeline

- Success Message Verification: 10 minutes
- Example Enhancement: 15 minutes
- Error Message Consistency: 10 minutes
- Documentation Enhancement: 15 minutes
- Additional Test Scenarios: 30 minutes

Total estimated time: ~1.5 hours
