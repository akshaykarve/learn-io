import React from 'react';
import renderer from 'react-test-renderer';
import MenuController from "./Menus";

const BrowserRouter = require("react-router-dom").BrowserRouter;

it('Not Logged In', () => {
	
	const tree = renderer.create(
	<BrowserRouter>
		<MenuController 
		isSignedIn={false} 
		isAdmin={false} 
		/>
	</BrowserRouter>
	).toJSON();
	expect(tree).toMatchSnapshot();
});
it('Not Logged In But Admin', () => {
	
	const tree = renderer.create(
	<BrowserRouter>
		<MenuController 
		isSignedIn={false} 
		isAdmin={true} 
		/>
	</BrowserRouter>
	).toJSON();
	expect(tree).toMatchSnapshot();
});
it('Logged In', () => {
	
	const tree = renderer.create(
	<BrowserRouter>
		<MenuController 
		isSignedIn={true} 
		isAdmin={false} 
		/>
	</BrowserRouter>
	).toJSON();
	expect(tree).toMatchSnapshot();
});
it('Logged In And Admin', () => {
	
	const tree = renderer.create(
	<BrowserRouter>
		<MenuController 
		isSignedIn={true} 
		isAdmin={true} 
		/>
	</BrowserRouter>
	).toJSON();;
	expect(tree).toMatchSnapshot();
});


export default MenuController;