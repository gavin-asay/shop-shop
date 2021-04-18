import React from 'react';
// import { useStoreContext } from '../../utils/GlobalState';
import { removeFromCart, updateCartQuantity } from '../../utils/reducers';
import { useDispatch } from 'react-redux';

import { idbPromise } from '../../utils/helpers';

const CartItem = ({ item }) => {
	const dispatch = useDispatch();

	const removeHandler = item => {
		dispatch(removeFromCart(item));

		idbPromise('cart', 'delete', { ...item });
	};

	const onChange = e => {
		const value = e.target.value;

		if (value === '0') {
			dispatch(removeFromCart(item));

			idbPromise('cart', 'delete', { ...item });
		} else {
			dispatch(updateCartQuantity({ ...item, purchaseQuantity: parseInt(value) }));

			idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
		}
	};

	return (
		<div className='flex-row'>
			<div>
				<img src={`/images/${item.image}`} alt='' />
			</div>
			<div>
				<div>
					{item.name}, ${item.price}
				</div>
				<div>
					<span>Qty:</span>
					<input type='number' placeholder='1' value={item.purchaseQuantity} onChange={onChange} />
					<span role='img' aria-label='trash' onClick={() => removeHandler(item)}>
						🗑️
					</span>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
