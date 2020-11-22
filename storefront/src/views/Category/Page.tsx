import React from "react";

import {Container, useTheme} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
import {baseUrl} from "@temp/app/routes";
// import {ProductList} from "@temp/components/ProductList";
import Hidden from "@material-ui/core/Hidden";
import {TUrlQuery} from "@temp/views/Category/View";
import {ProductsFilter} from "@temp/components/ProductsFilter";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {ProductsCardDetails_products} from "@sdk/queries/types/ProductsCardDetails";
import {Attributes_attributes} from "@sdk/queries/types/Attributes";
import {Category_category} from "@sdk/queries/types/Category";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import HomeIcon from '@material-ui/icons/Home';
import {ProductCard} from "@temp/components/ProductCard";
import Divider from "@material-ui/core/Divider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {makeStyles} from "@material-ui/core/styles";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import CheckIcon from "@material-ui/icons/Check";
import {BsFilter, BsGrid3X3Gap, BsGrid3X3GapFill} from "react-icons/bs";

const useStyles = makeStyles(theme => ({
    filterBtn: {
        [theme.breakpoints.up('md')]: {
            display: "none"
        },
        [theme.breakpoints.down('xs')]: {
            "& .MuiButton-startIcon": {
                marginRight: 0
            }
        }
    },
    sortByBtn: {
        [theme.breakpoints.down('xs')]: {
            "& .MuiButton-startIcon": {
                marginRight: 0
            }
        }
    }
}));

export enum PRODUCTS_SORT_BY_ENUM {
    DATE = 'most_recent',
    ORDER_COUNT = 'most_popular',
    BY_NAME = 'by_name'
}

const getSortByLabel = (sortBy: PRODUCTS_SORT_BY_ENUM | string):string => {
    switch (sortBy) {
        case PRODUCTS_SORT_BY_ENUM.ORDER_COUNT:
            return 'По рейтингу';
        case PRODUCTS_SORT_BY_ENUM.DATE:
            return 'Новинки';
        case PRODUCTS_SORT_BY_ENUM.BY_NAME:
            return 'По названию';
        default:
            return 'Новинки';
    }
}

const Page:React.FC<{
    products: ProductsCardDetails_products,
    category: Category_category,
    attributes: Attributes_attributes | null,
    loadMore(): Promise<void>,
    filters: TUrlQuery,
    setFilters(values: TUrlQuery):void,
    loading: boolean;
}> = ({products, category, attributes,
          loadMore, filters, setFilters, loading
      }) => {
    const classes = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorElSort, setAnchorElSort] = React.useState<HTMLButtonElement | null>(null);
    const handleChangeSortBy = (key: PRODUCTS_SORT_BY_ENUM | string) => e => {
        setFilters({sortBy: key as PRODUCTS_SORT_BY_ENUM});
        setAnchorElSort(null);
    };
    return(
        <div className="category-page">
            <Container maxWidth="xl" disableGutters={sm}>
                <div className="my-10">
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link className="flex items-center" color="inherit" to={baseUrl}>
                            <HomeIcon fontSize="small"/>
                        </Link>
                        <span>{category.name}</span>
                    </Breadcrumbs>
                </div>
                <div className="mb-10">
                    <Card>
                        <CardContent>
                            <Typography variant="h2"><span className="font-semibold">{category.name}</span></Typography>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardContent>
                            <Hidden smDown>
                                <div className="xs:w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 pr-20 float-left">
                                    <ProductsFilter attributes={attributes}
                                                    filters={filters}
                                                    setFilters={setFilters}
                                    />
                                </div>
                            </Hidden>

                            <div className="float-none inline-block xs:w-full sm:w-full md:w-2/3 lg:w-3/4 xl:w-5/6 p-5">
                                <div className="mb-10 flex justify-end items-center">
                                    <div className="flex w-full xs:justify-between md:justify-end items-center">
                                        <Button variant="outlined"
                                                className={classes.filterBtn}
                                                size="medium"
                                        >
                                            <BsFilter className="text-2xl"/>
                                        </Button>
                                        <div className="flex justify-end items-center">
                                            <div className="relative mr-20">
                                                <Button variant="outlined"
                                                        className={classes.sortByBtn}
                                                        startIcon={<SwapVertIcon/>}
                                                        endIcon={<ArrowDropDownIcon/>}
                                                        size="medium"
                                                        onClick={e => setAnchorElSort(e.currentTarget)}
                                                >
                                            <span className="normal-case sm:block xs:hidden leading-5">
                                                <span>{getSortByLabel(filters.sortBy)} </span>
                                            </span>
                                                </Button>
                                                <Popper open={Boolean(anchorElSort)}
                                                        anchorEl={anchorElSort}
                                                        className="w-full z-10 min-w-224"
                                                        style={{width: 174}}
                                                        role={undefined} transition disablePortal>
                                                    <ClickAwayListener onClickAway={e => setAnchorElSort(null)}>
                                                        <Paper>
                                                            <MenuList autoFocusItem={Boolean(anchorElSort)}>
                                                                {Object.values(PRODUCTS_SORT_BY_ENUM).map((el, i) => {
                                                                    return(
                                                                        <MenuItem key={i} onClick={handleChangeSortBy(el)}>
                                                                            <span className="flex-1">{getSortByLabel(el)}</span>
                                                                            {(filters.sortBy || PRODUCTS_SORT_BY_ENUM.DATE) === el &&
                                                                            <CheckIcon fontSize="small"/>
                                                                            }
                                                                        </MenuItem>
                                                                    )
                                                                })
                                                                }
                                                            </MenuList>
                                                        </Paper>
                                                    </ClickAwayListener>
                                                </Popper>
                                            </div>
                                            <ButtonGroup variant="outlined" size="medium">
                                                <Button variant="contained"
                                                        title="Крупная плитка"
                                                        color="primary"
                                                >
                                                    <BsGrid3X3GapFill className="text-2xl"/>
                                                </Button>
                                                <Button title="Малая плитка" >
                                                    <BsGrid3X3Gap className="text-2xl"/>
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                                <Divider/>
                                <div className="my-20"/>
                            </div>


                            {products && products.edges.map((item, i) => {
                                return (
                                    <div key={i} className="float-none inline-block xs:w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-5">
                                        <ProductCard item={item.node}/>
                                    </div>
                                );
                            })
                            }
                            {/*<ProductList items={products.edges}/>*/}
                            {products.pageInfo.hasNextPage &&
                            <div className="my-20 flex justify-center">
                                <div className="w-full sm:w-512 max-w-full">
                                    <Button variant="contained"
                                            color="primary"
                                            onClick={loadMore}
                                            fullWidth
                                            disabled={loading}
                                    >
                                        Показать еще
                                    </Button>
                                </div>
                            </div>
                            }
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default Page;