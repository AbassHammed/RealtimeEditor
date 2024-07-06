import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { haskell } from '@codemirror/legacy-modes/mode/haskell';
import { lua } from '@codemirror/legacy-modes/mode/lua';
import { perl } from '@codemirror/legacy-modes/mode/perl';
import { r } from '@codemirror/legacy-modes/mode/r';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { swift } from '@codemirror/legacy-modes/mode/swift';
import { csharp } from '@replit/codemirror-lang-csharp';

export const languages = {
  'C++': {
    extension: cpp(),
    fileExtension: '.cpp',
    backendIdentifier: 'cpp',
  },
  Python: {
    extension: python(),
    fileExtension: '.py',
    backendIdentifier: 'python',
  },
  JavaScript: {
    extension: javascript(),
    fileExtension: '.js',
    backendIdentifier: 'javascript',
  },
  C: {
    extension: cpp(),
    fileExtension: '.c',
    backendIdentifier: 'c',
  },
  Java: {
    extension: java(),
    fileExtension: '.java',
    backendIdentifier: 'java',
  },
  Ruby: {
    extension: StreamLanguage.define(ruby),
    fileExtension: '.rb',
    backendIdentifier: 'ruby',
  },
  Go: {
    extension: StreamLanguage.define(go),
    fileExtension: '.go',
    backendIdentifier: 'go',
  },
  Rust: {
    extension: rust(),
    fileExtension: '.rs',
    backendIdentifier: 'rust',
  },
  TypeScript: {
    extension: javascript({ typescript: true }),
    fileExtension: '.ts',
    backendIdentifier: 'typescript',
  },
  PHP: {
    extension: php(),
    fileExtension: '.php',
    backendIdentifier: 'php',
  },
  Swift: {
    extension: StreamLanguage.define(swift),
    fileExtension: '.swift',
    backendIdentifier: 'swift',
  },
  Kotlin: {
    extension: cpp(),
    fileExtension: '.kt',
    backendIdentifier: 'kotlin',
  },
  'C#': {
    extension: csharp(),
    fileExtension: '.cs',
    backendIdentifier: 'csharp',
  },
  Perl: {
    extension: StreamLanguage.define(perl),
    fileExtension: '.pl',
    backendIdentifier: 'perl',
  },
  Haskell: {
    extension: StreamLanguage.define(haskell),
    fileExtension: '.hs',
    backendIdentifier: 'haskell',
  },
  Lua: {
    extension: StreamLanguage.define(lua),
    fileExtension: '.lua',
    backendIdentifier: 'lua',
  },
  R: {
    extension: StreamLanguage.define(r),
    fileExtension: '.r',
    backendIdentifier: 'r',
  },
};
