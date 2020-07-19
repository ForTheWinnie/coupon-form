import styled from 'styled-components';

export const CouponColumn = styled.div`
h2 {
    margin-top: 0;
}
button {
    border: 1px solid #ee6762;
    color: #ee6762;
    margin-left: 1px;
    font-size: 14px;
    &:focus {
        outline: 0;
    }
    span.copied {
        color: #6ecb95;
        font-weight: 500;
    }
}
p:last-of-type {
    font-size: 14px;
}
`

export const FormColumn = styled.div`
form.newsletterForm {
    margin-top: 15px;
    label {
        margin-right: 5px;
    }
    .error {
        color: #ff0000;
    }
    button {
        background-color: #ee6762;
        border: none;
        border-radius: 3px;
        margin-top: 7px;
        margin-bottom: 20px;
        padding: 7px;
        color: #fff;
        font-weight: 500;
    }
}
.footnote {
    font-size: 13px;
}
`   