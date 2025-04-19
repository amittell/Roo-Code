import { ToolArgs } from "./types"

export function getPrependToFileDescription(args: ToolArgs): string {
	return `## prepend_to_file
Description: Request to prepend content to a file at the specified path. If the file exists, the content will be added to the beginning of the file. If the file doesn't exist, it will be created with the provided content. This tool will automatically create any directories needed to write the file.
Parameters:
- path: (required) The path of the file to prepend to (relative to the current workspace directory ${args.cwd})
- content: (required) The content to prepend to the file. The content will be added at the beginning of the existing file content. Do NOT include line numbers in the content.
Usage:
<prepend_to_file>
<path>File path here</path>
<content>
Your content to prepend here
</content>
</prepend_to_file>

Example: Requesting to prepend to a file
<prepend_to_file>
<path>src/scripts/config.js</path>
<content>
// Configuration file - updated on 2024-04-18
// Add license notice at the top
</content>
</prepend_to_file>`
}