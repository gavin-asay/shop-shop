import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

import { removeFromCart, updateCartQuantity, addToCart, updateProducts } from '../utils/reducers';
import { useSelector, useDispatch } from 'react-redux';

import Cart from '../components/Cart';

import { idbPromise } from '../utils/helpers';

function Detail() {
	const dispatch = useDispatch();

	const { id } = useParams();

	const [currentProduct, setCurrentProduct] = useState({});

	const { loading, data } = useQuery(QUERY_PRODUCTS);

	const products = useSelector(state => state.store.products);
	const cart = useSelector(state => state.store.cart);

	useEffect(() => {
		if (products.length) {
			setCurrentProduct(products.find(product => product._id === id));
		} else if (data) {
			dispatch(updateProducts(data.products));

			data.products.forEach(product => {
				idbPromise('products', 'put', product);
			});
		} else if (!loading) {
			idbPromise('products', 'get').then(indexedProducts => {
				dispatch(updateProducts(indexedProducts));
			});
		}
	}, [products, data, loading, dispatch, id]);

	const addHandler = () => {
		const itemInCart = cart.find(cartItem => cartItem._id === id);

		if (itemInCart) {
			dispatch(updateCartQuantity({ ...itemInCart, purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1 }));

			idbPromise('cart', 'put', {
				...itemInCart,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
		} else {
			dispatch(addToCart({ ...currentProduct, purchaseQuantity: 1 }));

			idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
		}
	};

	const removeHandler = () => {
		dispatch(removeFromCart(currentProduct._id));

		idbPromise('cart', 'delete', { ...currentProduct });
	};

	return (
		<>
			{currentProduct ? (
				<div className='container my-1'>
					<Link to='/'>← Back to Products</Link>

					<h2>{currentProduct.name}</h2>

					<p>{currentProduct.description}</p>

					<p>
						<strong>Price:</strong>${currentProduct.price} <button onClick={addHandler}>Add to Cart</button>
						<button disabled={!cart.find(p => p._id === currentProduct._id)} onClick={removeHandler}>
							Remove from Cart
						</button>
					</p>

					<img src={`/images/${currentProduct.image}`} alt={currentProduct.name} />
				</div>
			) : null}
			{loading ? <img src={spinner} alt='loading' /> : null}
			<Cart />
		</>
	);
}

export default Detail;
