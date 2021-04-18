import React, { useEffect } from 'react';
import { updateCategories, updateCurrentCategory } from '../../utils/reducers';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useSelector, useDispatch } from 'react-redux';

import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
	const categories = useSelector(state => state.store.categories);
	const dispatch = useDispatch();

	const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

	useEffect(() => {
		if (categoryData) {
			dispatch(updateCategories(categoryData.categories));
			categoryData.categories.forEach(category => {
				idbPromise('categories', 'put', category);
			});
		} else if (!loading) {
			idbPromise('categories', 'get').then(categories => {
				dispatch(dispatch(updateCategories(categories)));
			});
		}
	}, [categoryData, loading, dispatch]);

	const handleClick = id => {
		dispatch(updateCurrentCategory(id));
	};

	return (
		<div>
			<h2>Choose a Category:</h2>
			{categories.map(item => (
				<button
					key={item._id}
					onClick={() => {
						handleClick(item._id);
					}}
				>
					{item.name}
				</button>
			))}
		</div>
	);
}

export default CategoryMenu;
