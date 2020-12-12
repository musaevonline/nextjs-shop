import React, {useEffect, useState} from "react";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {TUrlQuery} from "@temp/views/Category/View";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {Collapse} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import {Attributes_attributes} from "@sdk/queries/types/Attributes";
import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles({
    divider: {
        margin: '1rem 0'
    }
});
const FILTER_HEIGHT = 300;

function valuetext(value: number) {
    return `${value}`;
}
const MAX_PRICE = 10000;

const ProductsFilter:React.FC<{
    attributes: Attributes_attributes | null,
    filters: TUrlQuery,
    setFilters(values: TUrlQuery):void,
}> = ({attributes, filters,  setFilters}) =>{
    const classes = useStyles();
    const priceRange = filters.priceRange || [0, MAX_PRICE];
    const [collapse, setCollapse] = useState([]);
    const [localPriceRange, setLocalPriceRange] = useState<number | number[]>(priceRange);

    useEffect(() => {
        setLocalPriceRange(priceRange);
    }, [filters.priceRange]);

    const handleChangeAttributes = (attributeSlug, value) => e => {
        e.preventDefault();
        if (filters.attributes) {
            const newAttributes = _.cloneDeep(filters.attributes);
            const index = _.findIndex(filters.attributes, el => el.slug === attributeSlug);
            if (index !== -1) {
                if (newAttributes[index].values.includes(value)) {
                    newAttributes[index].values = _.filter(newAttributes[index].values, el => el !== value);
                    if (newAttributes[index].values.length === 0){
                        newAttributes.splice(index, 1);
                    }
                } else {
                    newAttributes[index].values.push(value)
                }
            } else {
                newAttributes.push({
                    slug: attributeSlug,
                    values: [value]
                });
            }
            setFilters({attributes:newAttributes});
        }else{
            setFilters({attributes: [{
                    slug: attributeSlug,
                    values: [value]
                }]});
        }
    };

    const toggleCollapse = id => e =>{
        if (collapse.includes(id)){
            setCollapse(prev => ([...prev.filter(el => el !== id)]))
        } else{
            setCollapse(prev => ([...prev, id]))
        }
    };

    const handleChangePrice = (event: any, newValue: number | number[]) => {
        setLocalPriceRange(newValue as number[]);
    };

    return(
        <div>
            <div>
                <div className="flex justify-between items-center">
                    <Typography variant="button">Цена</Typography>
                    <div  className="transition ease-in-out duration-300"
                          style={{transform: !collapse.includes('priceId') ? 'scaleY(-1)' : 'scaleY(1)'}}>
                        <IconButton size="small"
                                    onClick={toggleCollapse('priceId')}
                        >
                            <KeyboardArrowDownIcon/>
                        </IconButton>
                    </div>
                </div>
                <Collapse in={!collapse.includes('priceId')}>
                    <Slider
                        value={localPriceRange}
                        step={1}
                        max={MAX_PRICE}
                        onChange={handleChangePrice}
                        onChangeCommitted={(e, newValue) => {setFilters({priceRange: newValue as number[]});}}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        color="secondary"
                    />
                </Collapse>
                <Divider variant="fullWidth" classes={{root: classes.divider}}/>
            </div>
            {attributes &&
            <div>
                {attributes.edges.map(edge => {
                    const node = edge.node;
                    const index = _.findIndex(filters.attributes, el => el.slug === node.slug);
                    const collapsed = !collapse.includes(node.id);
                    return(
                        <div key={node.id}>
                            <div className="flex justify-between items-center">
                                <Typography variant="button"><span className="normal-case">{node.name}</span></Typography>
                                <div  className="transition ease-in-out duration-300"
                                      style={{transform: collapsed ? 'scaleY(-1)' : 'scaleY(1)'}}>
                                    <IconButton size="small"
                                                onClick={toggleCollapse(node.id)}
                                    >
                                        <KeyboardArrowDownIcon/>
                                    </IconButton>
                                </div>
                            </div>
                            <Collapse in={collapsed}>
                                <Scrollbars
                                            autoHeight
                                            autoHeightMax={FILTER_HEIGHT}
                                >
                                    {node.values.map(val => {
                                        const selected = index !== -1 ? filters.attributes[index].values.includes(val.slug) : false;
                                        return(
                                            <div key={val.id}>
                                                <FormControlLabel
                                                    className="w-full"
                                                    aria-label={val.name}
                                                    onClick={handleChangeAttributes(node.slug, val.slug)}
                                                    // onFocus={(event) => event.stopPropagation()}
                                                    control={<Checkbox checked={selected}
                                                                       size="small"
                                                                       color="secondary"
                                                    />}
                                                    label={`${val.name}`}
                                                />
                                            </div>
                                        )
                                    })}
                                </Scrollbars>
                            </Collapse>
                            <Divider variant="fullWidth" classes={{root: classes.divider}}/>
                        </div>
                    )
                })}
            </div>
            }
        </div>
    );
};

export default ProductsFilter;