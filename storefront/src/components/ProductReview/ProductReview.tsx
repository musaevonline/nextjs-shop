import './scss/index.scss';

import React from "react";
import {ProductReview} from "@sdk/fragments/types/ProductReview";
import {dateToString} from "@temp/core/utils";
import Rating from "@material-ui/lab/Rating";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {Divider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
    divider:{
        margin: '1rem 0'
    }
});

const RATING = {
    A_1: 1,
    A_2: 2,
    A_3: 3,
    A_4: 4,
    A_5: 5,
};

interface IProductReviewProps {
    review: ProductReview
}

const ProductReview:React.FC<IProductReviewProps> = ({ review }) =>{
    const classes = useStyles();
    const advantages = JSON.parse(review.advantages);
    const flaws = JSON.parse(review.flaws);

    return(
        <>
            <div className="review p-2 flex flex-wrap items-start">
                <div className="review__user-data">
                    <div className="review__avatar mr-10">
                        <Avatar src={review.userAvatar} alt={review.userName} variant="circle"/>
                    </div>

                </div>
                <div className="flex-1">
                    <div className="review__username">{review.userName}</div>

                    <div className="review__created">{dateToString(review.createdAt)}</div>

                    <div className="review__rating">
                        <Rating
                            size="small"
                            name="simple-controlled"
                            defaultValue={RATING[review.rating]}
                        />
                    </div>
                    <Typography variant="h5" gutterBottom><strong>{review.title}</strong></Typography>
                    <div className="review__content pt-5">{review.content}</div>
                    <div className="flex flex-wrap mt-10">
                        {advantages.advantages?.length > 0 &&
                        <div className="review__advantages flex flex-1 min-w-200">
                            <ThumbUpIcon className="mr-10"/>
                            <div className="flex-col">
                                {advantages.advantages.map((el, i) => <div key={i}>{el}</div>)}
                            </div>
                        </div>
                        }
                        {flaws.flaws?.length > 0 &&
                        <div className="review__flaws flex flex-1 min-w-200">
                            <ThumbDownIcon className="mr-10"/>
                            <div className="flex-col">
                                {flaws.flaws.map((el, i) => <div key={i}>{el}</div>)}
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <Divider className={classes.divider}/>
        </>
    )
};

export default ProductReview;