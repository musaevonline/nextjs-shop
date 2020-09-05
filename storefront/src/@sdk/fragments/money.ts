import {gql} from '@apollo/client';

export const MoneyRange = gql`
    fragment MoneyRange on MoneyRange{
        start{
            amount
            currency
        }
        stop{
            amount
            currency
        }
    }
`;
export const Money = gql`
    fragment Money on Money{
        amount
        currency
    }
`;
export const TaxedMoney = gql`
    fragment TaxedMoney on TaxedMoney{
        gross{
            amount
        }
        net{
            amount
        }
        tax{
            amount
        }
        currency
    }
`;