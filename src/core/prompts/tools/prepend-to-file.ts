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

Example: Requesting to prepend a license header
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

Example: Requesting to prepend import statements
<prepend_to_file>
<path>src/components/Button.js</path>
<content>
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

</content>
</prepend_to_file>`
}