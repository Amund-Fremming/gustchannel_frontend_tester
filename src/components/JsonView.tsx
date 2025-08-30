import React from "react";

type JsonViewProps = {
    data: unknown;
};

const JsonView: React.FC<JsonViewProps> = ({ data }) => {
    return (
        <pre
            style={{
                backgroundColor: "#1e1e1e",
                color: "#d4d4d4",
                padding: "1rem",
                borderRadius: "0.5rem",
                overflowX: "auto",
                fontFamily: "monospace",
                fontSize: "14px"
            }}
        >
            {JSON.stringify(data, null, 2)}
        </pre>
    );
};

export default JsonView;
