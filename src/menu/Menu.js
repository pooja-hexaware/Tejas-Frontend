
import { useState, useEffect } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import Cart from "./Cart";
import Modal from 'react-bootstrap/Modal';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Image, List, Form } from 'semantic-ui-react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import Button from 'react-bootstrap/Button';
import Card from '@mui/material/Card';
import { CardContent, ListItem, TextField } from "@mui/material";
import CardCover from '@mui/joy/CardCover';
import backgrdPic from '../images/pic6.png';
import basilPesto from '../images/basil pesto.png'
import HoneyMustard from '../images/Honey mustard.png'
import hummus from '../images/hummus.png'
import Ketchup from '../images/ketchup.png'
import OliveOil from '../images/Olive oil.png'
import pitaBread from '../images/pita bread.png'
import SpiceMix from '../images/spice mix.png'
import Ranch from '../images/Ranch.png'
import Sundried from '../images/sundried tomato pesto spread.png'
import Vinegar from '../images/vinegar.png'
import { render } from "react-dom";
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { useDispatch } from 'react-redux';
import { addToppings } from "../toppings/ToppingsSlice";
import { addMenu, clearActiveMenu, updateMenu } from "./CartSlice";
import { useSelector } from 'react-redux';
import { Input } from 'semantic-ui-react'
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { Icon, Label } from 'semantic-ui-react';
import { Controller, useForm } from "react-hook-form";
import { blue, lightBlue } from '@mui/material/colors';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const defaultValues = {

  storeId: "",
  PersonName: "",
  street: '',
  postalCode: '',
  city: '',
  mobile: '',

}
function Menu() {

  const { control, watch, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues,

  });

  const axios = require('axios').default;
  const [store, setStore] = React.useState({});
  const [toppings, setToppings] = React.useState({});
  const [selectToppingName, setSelectToppingName] = React.useState([]);
  const [selectToppingPrice, setSelectToppingPrice] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [cart, setCart] = React.useState();
  const dispatch = useDispatch();
  const [Amount, setAmount] = React.useState(1);
  const selectCart = useSelector((state) => state.Cart.cart);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [GrandAmount, setGrandAmount] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [formOpen, setFormOpen] = React.useState(false)
  const storeId = watch("storeId")
  const PersonName = watch("PersonName")
  const street = watch("street")
  const postalCode = watch("postalCode")
  const city = watch("city")
  const mobile = watch("mobile")

  var amo
  // const selectedCart = useSelector((state) => state.Cart.cart);

  const { id } = useParams();
  console.log("set cart", cartOpen);

  const handleClose = () => {

    setOpen(false)

  }

  function onSubmit(data) {
   
    axios.post('http://localhost:3000/api/order', {
      storeId: id,
      PersonName: data.PersonName,
      street: data.street,
      postalCode: data.postalCode,
      city: data.city,
      mobile: data.mobile,
      OrderItem: selectCart
    }).then(function (response) {
        console.log(response);
        window.alert('Order Submitted Successfully')
        handleCloseForm()
        handleCloseCart()
        dispatch(clearActiveMenu())
        setCount(0)

    })
  }


  const addMenus = (menu) => {

    console.log({ ...menu, quantity: Amount })
    dispatch(updateMenu({ menuId: menu._id, menuName: menu.foodName, menuPrice: menu.foodPrice, menuId: menu._id, quantity: Amount, toppings: selectToppingName }))
    setCount(Number(count + Amount));

    setSelectToppingName('');

    fetch("http://localhost:3000/api/store/" + id)
      .then((response) => response.json())

      .then((data) => {
        setStore(data);
        setMenus(data[0]?.menu)


      }
      )
  }
  console.log("count is", count)


  const handleOpenCart = () => {
    setCartOpen(true);

    setGrandAmount(selectCart?.map((menu) => menu.priceWithQunt))

  };
  amo = GrandAmount.reduce((prev, curr, index) => prev + curr, 0);
  console.log("grandTotal", GrandAmount)

  console.log("Amo", amo)
  const handleCloseCart = () => {
    setCartOpen(false);
  };

  const handleOpenForm = () => {
    setFormOpen(true);
  };
  const handleCloseForm = () => {
    setFormOpen(false);
  }
  const EmptyCart = () => {
    dispatch(clearActiveMenu())
    setCount(0)
    amo=0;
  }
 
  const SelectPicFood = (foodname) => {
    if(foodname == 'Loaded Veggie'){
      return 'https://buildyourbite.com/wp-content/uploads/2019/02/veggie-nachos-28.jpg'
    }
    else if(foodname == "Hummus Falafel"){
      return 'https://i.pinimg.com/originals/0e/b5/2f/0eb52f7345490bea94871ae35fc800ad.jpg'
    }
    else if(foodname == "Feta Falafel"){
      return 'https://recipe-images.azureedge.net/Medium/26947371-3c99-40b9-baf9-cdd92cfbcb4e.jpg/'
    }
    else if(foodname == "Double Bagel"){
      return 'https://www.cookiemadness.net/wp-content/uploads/2016/05/doublechocolatebagels1.jpg'
    }
  }

  const SelectPic = (ToppingName) => {
    console.log(ToppingName)
    if (ToppingName == "Olive Oil") {
      return OliveOil;
    }
    else if (ToppingName == "ketchup") {
      return Ketchup
    }
    else if (ToppingName == "Vinegar") {
      return Vinegar
    }
    else if (ToppingName == "Spice mix") {
      return SpiceMix
    }
    else if (ToppingName == "Sundried tomato pesto spread") {
      return Sundried
    }
    else if (ToppingName == "Pita Bread") {
      return pitaBread
    }
    else if (ToppingName == "Hummus") {
      return hummus
    }
    else if (ToppingName == "Honey mustard") {
      return HoneyMustard
    }
    else if (ToppingName == "ranch") {
      return Ranch
    }
    else if (ToppingName == "Basil Pesto") {
      return basilPesto
    }

  }
  useEffect(() => {
    fetch("http://localhost:3000/api/store/" + id)
      .then((response) => response.json())

      .then((data) => {
        setStore(data);
        setMenus(data[0]?.menu)


      }
      )
  }, []);
  console.log(store);
  const [menus, setMenus] = React.useState([]);
  console.log("check", menus)

  const updateMenus = (menuId, price, name) => {
    setMenus(


      menus.map((menu) =>
        (menu._id == menuId) ? { foodPrice: menu.foodPrice += price, ...menu } : menu
      )


    )
    setSelectToppingName((oldArr) => [...oldArr, name])



  }
  console.log(selectToppingName)





  function popup(data) {

    setOpen(true);
    // var topp = data[0]?.toppings
    // console.log("bagh re", topp)
    setToppings(data)

  }

  const GrandTotal = () => {

    return GrandAmount;

  }

  var label = "Add"
  var topp = toppings[0]?.toppings
  var menu_id = toppings[0]?._id
  const myStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VwY2FrZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')`,
    height: '120vh',
    marginTop: '-20px',
    fontSize: '13px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={myStyle}>

      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><h4>WiWi Food App (Capstone)</h4></Navbar.Brand>
          <Nav className="me-auto">


          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Brand size="small" variant="outline-success">
              <Button size="small" onClick={handleOpenCart}>
                {count > 0 ? <h5><Label color='green' size="large" ><ShoppingCartSharpIcon sx={{ color: 'secondary' }}></ShoppingCartSharpIcon> Your Cart  ({count})</Label></h5> : <h5><Label color='black' size="large" ><ShoppingCartSharpIcon sx={{ color: 'secondary' }}></ShoppingCartSharpIcon> Your Cart  ({count})</Label></h5>
                }
              </Button>
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
      <br></br>
      <>
        <Card variant="outlined"   sx={{ mx: 20 ,bgcolor: blue[300]}}>

          <CardContent>
            <Typography variant="h5" component="div" color={lightBlue[50]} >
             <b> Good Food,Great Time</b>
            </Typography>
            <Typography variant="body2">
              Our chefs at WiWi make delicious food selections every week- you pick,we cook and deliver.
              <br />
            </Typography>
          </CardContent>

        </Card>
      </>
      <br></br>
      <br></br>
      <>

        <Card sx={{ mx: 30 }}>
          <CardContent>
            <List divided verticalAlign='middle'>
              {
                menus?.map((menu) => (
                  <List.Item>

                    <List.Content floated='right'>
                      <List.Content size="mini" >
                        <Box
                          sx={{
                            width: 100,
                            maxWidth: '100%',
                          }}
                        >
                          <TextField
                            id="outlined-number"
                            label="Amount"
                            type="number"
                            size="small"
                            value={Amount}
                            onChange={(e) => { setAmount(Number(e.target.value)) }}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />{console.log("Amount", Amount)}
                        </Box>
                      </List.Content>
                      <br></br>
                      <List.Content>
                        <Button color="blue" onClick={() => addMenus(menu)}>Add</Button>
                      </List.Content>
                    </List.Content>


                    <Image avatar src={SelectPicFood(menu?.foodName)} floated="left" />
                    <br></br>
                    <List.Content>
                      <List.Header floated="left"><h6><b>{menu?.foodName}</b></h6></List.Header>
                      <List.Description floated="left">
                        {menu?.description}
                      </List.Description>

                      <br></br>

                      <List.Content floated='left'>
                        <Button onClick={() => {
                          fetch("http://localhost:3000/api/menu/" + menu?._id)
                            .then((response) => response.json())

                            .then((data) => {
                              console.log("alo", data)

                              popup(data)

                            }
                            )

                        }} color="blue" size="small">topings</Button>
                      </List.Content>
                      <List.Content floated="right"><h6 color="blue">Price $ {menu?.foodPrice}</h6></List.Content>
                      <br></br>


                    </List.Content>






                  </List.Item>
                ))}
            </List>
          </CardContent>
        </Card>
        <Modal className="custom_popupp" show={open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><p class="font_20 font_regular mb-0">Toppings </p></Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-0">
            <div class="row">
              <div class="col-12">
                <List divided verticalAlign='middle'>
                  {topp?.map((top) => (
                    <List.Item>
                      <List.Content floated="left">
                        <List.Header floated="left">{top?.ToppingName}</List.Header>

                        <Image avatar src={SelectPic(top?.ToppingName)} floated="left" />
                      </List.Content>
                      <List.Content floated="right">
                        <List.Header floated="right">$ {top?.ToppingPrice}</List.Header>

                      </List.Content>
                      <List.Content>
                        <Checkbox onClick={() => { console.log("check box menu id is", menu_id) }} />
                      </List.Content>
                      <List.Content floated="right"><Button color="pink" onClick={() => {
                        console.log("menu id is", menu_id)
                        updateMenus(menu_id, top?.ToppingPrice, top?.ToppingName)


                        //dispatch(addToppings({ toppingName: top?.ToppingName, toppingPrice: top?.ToppingPrice }))
                        console.log("alis ka", addToppings)
                      }}>Add</Button></List.Content>
                    </List.Item>
                  )

                  )

                  }
                </List>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>



        <div>

          <Modal className="custom_popupp" size="lg" show={cartOpen} onHide={handleCloseCart}>
            <Modal.Header closeButton>
              <Modal.Title><p class="font_20 font_regular mb-0">Cart </p></Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-0">
              <div class="row">
                <div class="col-12">
                  <List divided verticalAlign='middle'>
                    {selectCart?.map((menu) => (

                      <List.Item>
                        <List.Content floated="left">
                          <List.Header floated="left"><h5>{menu?.menuName}</h5></List.Header>
                          <List.Description floated="left">{menu?.toppings}</List.Description>
                        </List.Content>

                        <br></br>
                        <List.Content floated="left">
                          <List.Header floated="left"> .     $ {menu?.menuPrice}</List.Header>
                          <List.Description> .         x {menu?.quantity}</List.Description>
                        </List.Content>
                        
                        <List.Content floated="right">
                          <List.Header floated="right">$ {menu?.priceWithQunt}</List.Header>

                        </List.Content>


                        
                      </List.Item>
                    )

                    )
                    }
                  </List>


                  <div>{count > 0 ?<h5><List.Item><Label color="green" size="large"> Total Price</Label> <Icon name='dollar sign' size='normal' />{amo}</List.Item></h5>:<h3>Your cart is empty</h3>}</div><br></br>
                  <div><List><List.Item floated="right"><List.Content floated="right">
                    <List.Header floated="right">
                    <Button color="orange" onClick={EmptyCart}> Empty Cart </Button>

                      <Button color="green" onClick={handleOpenForm}> Order </Button>
                    </List.Header>
                  </List.Content></List.Item></List></div>

                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal className="custom_popupp" show={formOpen} onHide={handleCloseForm}>
            <Modal.Header closeButton>
              <Modal.Title><p class="font_20 font_regular mb-0">Cart </p></Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-0">
              <div class="row">
                <div class="col-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ ml: 1 }}>
                      <Box
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '50ch' },
                        }}
                      >
                        <Box sx={{ ml: 0 }}><h3>Details </h3></Box>
                        <div>
                          <Controller
                            control={control}
                            name="PersonName"
                            render={({ field }) => (

                              <TextField
                                {...field}
                                id="PersonName"
                                label="Your name "
                                variant="outlined"
                                type="text"
                                size="small"
                                value={PersonName}
                                required
                                fullWidth
                                autoFocus

                              />

                            )} />

                        </div>
                        <div>
                          <Controller
                            control={control}
                            name="street"
                            render={({ field }) => (

                              <TextField
                                {...field}
                                id="street"
                                label="Street"
                                variant="outlined"
                                type="text"
                                size="small"
                                value={street}
                                required
                                fullWidth
                                autoFocus

                              />

                            )} />
                            </div>

                            <div>
                          <Controller
                            control={control}
                            name="postalCode"
                            render={({ field }) => (

                              <TextField
                                {...field}
                                id="postalCode"
                                label="Postal code"
                                variant="outlined"
                                type="text"
                                size="small"
                                value={postalCode}
                                required
                                fullWidth
                                autoFocus

                              />

                            )} />
                            </div>
                            <div>
                            <Controller
                            control={control}
                            name="city"
                            render={({ field }) => (

                              <TextField
                                {...field}
                                id="city"
                                label="City"
                                variant="outlined"
                                type="text"
                                size="small"
                                value={city}
                                required
                                fullWidth
                                autoFocus

                              />

                            )} />
                            </div>

                            <div>
                            <Controller
                            control={control}
                            name="mobile"
                            render={({ field }) => (

                              <TextField
                                {...field}
                                id="mobile"
                                label="Mobile"
                                variant="outlined"
                                type="mobile"
                                size="small"
                                value={mobile}
                                required
                                fullWidth
                                autoFocus

                              />

                            )} />
                            </div>
                          
                            <Button onClick={handleCloseForm} color="red">Cancel</Button>
                          <Button type='submit'  color="green">Submit</Button>
                          </Box>
                         </Box>
                        </form>
                       
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>

                  </Modal.Footer>
                </Modal>
              </div>

            </>
        </div>
        );
}

        export default Menu