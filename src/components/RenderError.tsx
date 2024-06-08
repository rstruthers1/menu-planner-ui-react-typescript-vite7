// src/utils/formUtils.ts
import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface RenderErrorProps {
    error?: FetchBaseQueryError | SerializedError | { status: number; message: string };
}

const RenderError: React.FC<RenderErrorProps> = ({ error }) => {
    if (!error) return null; // Returns null if there is no error

    console.log(error);
    if ('data' in error && error.data && typeof error.data === 'object') {
        if ('message' in error.data && typeof error.data.message === 'string') {
            return <span>{error.data.message}</span>; // Wrap in an element for consistent React element return
        }
        if ('errors' in error.data && Array.isArray(error.data.errors)) {
            return (
                <ul>
                    {error.data.errors.map((err, index) => (
                        <li key={index}>{err.msg}</li> // Assuming each error has a 'msg' property
                    ))}
                </ul>
            );
        }
    }

    return <span>Unknown error</span>; // Return as a React element
};

export default RenderError;
