import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import React, {FC} from 'react';
import "./index.scss";
import {IPostKeys} from "../../../redux/reducers/postsReducer";

interface IOptions {
    value: IPostKeys,
    name: string
}

interface IPostSortProps {
    handleSort: (value: IPostKeys) => void,
    options: IOptions[],
    value?: IPostKeys
}

const PostSort: FC<IPostSortProps> = ({handleSort, options, value}) => {
    return (
        <div className="filters-wrap">
            <FormControl fullWidth>
                <InputLabel id="sort-select">Sort by...</InputLabel>
                <Select
                    labelId="sort-select"
                    value={value}
                    label="Sort"
                    onChange={(e) => handleSort(e.target.value as IPostKeys)}
                >
                    {
                        options.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
};

export default PostSort;