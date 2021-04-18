import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../../utils/reducers';

import { idbPromise } from '../../utils/helpers';

function ProductList() {
	const products = useSelector(state => state.store.products);
	const currentCategory = useSelector(state => state.store.currentCategory);
	const dispatch = useDispatch();

	const { loading, data } = useQuery(QUERY_PRODUCTS);

	useEffect(() => {
		if (data) {
			dispatch(updateProducts(data.products));

			data.products.forEach(product => {
				idbPromise('products', 'put', product);
			});
		} else if (!loading) {
			idbPromise('products', 'get').then(idbProducts => {
				dispatch(updateProducts(idbProducts));
			});
		}
	}, [data, products, loading, dispatch]);

	function filterProducts() {
		if (!currentCategory) {
			return products;
		}

		return products.filter(product => product.category._id === currentCategory);
	}

	return (
		<div className='my-2'>
			<h2>Our Products:</h2>
			{products.length ? (
				<div className='flex-row'>
					{filterProducts().map(product => (
						<ProductItem
							key={product._id}
							_id={product._id}
							image={product.image}
							name={product.name}
							price={product.price}
							quantity={product.quantity}
						/>
					))}
				</div>
			) : (
				<h3>You haven't added any products yet!</h3>
			)}
			{loading ? <img src={spinner} alt='loading' /> : null}
		</div>
	);
}

export default ProductList;
