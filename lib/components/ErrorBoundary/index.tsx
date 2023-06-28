/**
 * Author: Moki
 * Date: 2023-06-28
 * Todo: 错误边界
 **/
import React, {ErrorInfo} from 'react';
import {StyledErrorWrapper} from "./styled/StyledErrorWrapper";


type ErrorBoundaryProps = {
    onError?: (error: Error, stack: ErrorInfo) => void;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

type ErrorBoundaryState = {
    hasError: boolean;
    errInfo: any
}


export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errInfo: null
        };
    }

    /**
     * Author: Moki
     * Date: 2023-06-28
     * Todo: 错误捕捉返回
     **/
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const {onError} = this.props;
        this.setState({
            hasError: true,
            errInfo: errorInfo
        });
        onError && onError(error, errorInfo);
    }


    render() {
        const {fallback} = this.props;
        const {hasError, errInfo} = this.state;
        if (hasError) {
            if (fallback && React.isValidElement(fallback)) {
                return fallback;
            }
            return (
                <StyledErrorWrapper>
                    <span>Render pdf Error !!!</span>
                </StyledErrorWrapper>
            );
        }
        return this.props.children;
    }
}
