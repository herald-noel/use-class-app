import { Editor } from '@monaco-editor/react'

const DocsEditor = ({ value }) => {
    return (
        <Editor
            theme="vs-dark"
            height="200px"
            defaultLanguage="kotlin"
            value={value}
            options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                readOnly: true,
            }}
        />
    )
}

export default DocsEditor
