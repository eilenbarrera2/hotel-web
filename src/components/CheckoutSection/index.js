import React, { Fragment } from 'react';
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import FontAwesome from "../../components/UiStyle/FontAwesome";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link } from 'react-router-dom'
import { totalPrice } from "../../utils";

// images
import visa from '../../images/icon/visa.png';
import mastercard from '../../images/icon/mastercard.png';
import skrill from '../../images/icon/skrill.png';
import paypal from '../../images/icon/paypal.png';

import CheckWrap from '../CheckWrap'

import './style.scss';

const cardType = [
    {
        title: 'visa',
        img: visa
    },
    {
        title: 'mastercard',
        img: mastercard
    },
    {
        title: 'skrill',
        img: skrill
    },
    {
        title: 'paypal',
        img: paypal
    },
];


const CheckoutSection = ({ cartList }) => {
    // states
    const [tabs, setExpanded] = React.useState({
        cupon: false,
        billing_adress: false,
        payment: true
    });
    const [forms, setForms] = React.useState({
        cupon_key: '',
        fname: '',
        lname: '',
        country: '',
        dristrict: '',
        address: '',
        post_code: '',
        email: '',
        phone: '',
        note: '',

        payment_method: 'cash',
        card_type: '',

        fname2: '',
        lname2: '',
        country2: '',
        dristrict2: '',
        address2: '',
        post_code2: '',
        email2: '',
        phone2: '',

        card_holder: '',
        card_number: '',
        cvv: '',
        expire_date: '',
    });

    const [dif_ship, setDif_ship] = React.useState(false);

    // tabs handler
    function faqHandler(name) {
        setExpanded({
            cupon: false,
            billing_adress: false,
            payment: true, [name]: !tabs[name]
        });
    }

    // forms handler
    const changeHandler = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    };


    return (
        <Fragment>
            <Grid className="checkoutWrapper section-padding">
                <Grid className="container" container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <div className="check-form-area">
                            <Grid className="cuponWrap checkoutCard">
                                <Button className="collapseBtn" fullWidth onClick={() => faqHandler('cupon')}>
                                    ¿Tienes un cupón? Haz clic aquí para ingresar tu código.
                                    <FontAwesome name={tabs.cupon ? 'minus' : 'plus'} />
                                </Button>
                                <Collapse in={tabs.cupon} timeout="auto"
                                    unmountOnExit>
                                    <Grid className="chCardBody">
                                        <p>Si tienes un código de cupón, por favor aplícalo</p>
                                        <form className="cuponForm">
                                            <TextField
                                                fullWidth
                                                type="text"
                                                className="formInput radiusNone"
                                                value={forms.cupon_key}
                                                name="cupon_key"
                                                onChange={(e) => changeHandler(e)}
                                            />
                                            <Button className="cBtn cBtnBlack">Aplicar</Button>
                                        </form>
                                    </Grid>
                                </Collapse>
                            </Grid>
                            <Grid className="cuponWrap checkoutCard">
                                <Button className="collapseBtn" fullWidth onClick={() => faqHandler('billing_adress')}>
                                    Dirección de Facturación
                                    <FontAwesome name={tabs.billing_adress ? 'minus' : 'plus'} />
                                </Button>
                                <Collapse in={tabs.billing_adress} timeout="auto" unmountOnExit>
                                    <Grid className="chCardBody">
                                        <form className="cuponForm">
                                            <Grid container spacing={3}>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Nombre"
                                                        name="fname"
                                                        value={forms.fname}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Apellido"
                                                        name="lname"
                                                        value={forms.lname}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <InputLabel id="demo-simple-select-filled-label">País</InputLabel>
                                                    <FormControl className="formSelect" fullWidth variant="filled">
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            value={forms.country}
                                                            name="country"
                                                            onChange={(e) => changeHandler(e)}
                                                        >
                                                            <MenuItem value="">
                                                                <em>Ninguno</em>
                                                            </MenuItem>
                                                            <MenuItem value={10}>Estados Unidos</MenuItem>
                                                            <MenuItem value={20}>México</MenuItem>
                                                            <MenuItem value={30}>España</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Distrito"
                                                        name="dristrict"
                                                        value={forms.dristrict}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        rows="3"
                                                        label="Dirección"
                                                        name="address"
                                                        value={forms.address}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Código Postal"
                                                        name="post_code"
                                                        value={forms.post_code}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Correo Electrónico"
                                                        name="email"
                                                        value={forms.email}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="email"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Teléfono"
                                                        name="phone"
                                                        value={forms.phone}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel
                                                        className="checkBox"
                                                        control={
                                                            <Checkbox
                                                                checked={dif_ship}
                                                                onChange={() => setDif_ship(!dif_ship)}
                                                                value={dif_ship}
                                                                color="primary"
                                                            />
                                                        }
                                                        label="¿Enviar a una dirección diferente?"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Collapse in={dif_ship} timeout="auto" unmountOnExit>
                                                        <Grid container spacing={3}>
                                                            <Grid item sm={6} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Nombre"
                                                                    name="fname2"
                                                                    value={forms.fname2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={6} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Apellido"
                                                                    name="lname2"
                                                                    value={forms.lname2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={6} xs={12}>
                                                                <InputLabel
                                                                    id="demo-simple-select-filled-label">País</InputLabel>
                                                                <FormControl className="formSelect" fullWidth
                                                                    variant="filled">
                                                                    <Select
                                                                        labelId="demo-simple-select-filled-label"
                                                                        id="demo-simple-select-filled"
                                                                        value={forms.country2}
                                                                        name="country2"
                                                                        onChange={(e) => changeHandler(e)}
                                                                    >
                                                                        <MenuItem value="">
                                                                            <em>Ninguno</em>
                                                                        </MenuItem>
                                                                        <MenuItem value={10}>Estados Unidos</MenuItem>
                                                                        <MenuItem value={20}>México</MenuItem>
                                                                        <MenuItem value={30}>España</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item sm={6} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Distrito"
                                                                    name="dristrict2"
                                                                    value={forms.dristrict2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    multiline
                                                                    rows="3"
                                                                    label="Dirección"
                                                                    name="address2"
                                                                    value={forms.address2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={6} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Código Postal"
                                                                    name="post_code2"
                                                                    value={forms.post_code2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={6} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Correo Electrónico"
                                                                    name="email2"
                                                                    value={forms.email2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="email"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Teléfono"
                                                                    name="phone2"
                                                                    value={forms.phone2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Collapse>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        label="Notas del Pedido"
                                                        placeholder="Nota sobre tu pedido"
                                                        name="note"
                                                        value={forms.note}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone note"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Collapse>
                            </Grid>
                            <Grid className="cuponWrap checkoutCard">
                                <Button className="collapseBtn" fullWidth onClick={() => faqHandler('payment')}>
                                    Método de Pago
                                    <FontAwesome name={tabs.payment ? 'minus' : 'plus'} />
                                </Button>
                                <Grid className="chCardBody">
                                    <Collapse in={tabs.payment} timeout="auto">
                                        <RadioGroup className="paymentMethod" aria-label="Método de Pago"
                                            name="payment_method"
                                            value={forms.payment_method}
                                            onChange={(e) => changeHandler(e)}>
                                            <FormControlLabel value="cash" control={<Radio color="primary" />}
                                                label="Pago con Tarjeta" />
                                            <FormControlLabel value="card" control={<Radio color="primary" />}
                                                label="Pago Contra Entrega" />

                                        </RadioGroup>
                                        <Collapse in={forms.payment_method === 'cash'} timeout="auto">
                                            <Grid className="cardType">
                                                {cardType.map((item, i) => (
                                                    <Grid
                                                        key={i}
                                                        className={`cardItem ${forms.card_type === item.title ? 'active' : null}`}
                                                        onClick={() => setForms({ ...forms, card_type: item.title })}>
                                                        <img src={item.img} alt={item.title} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Grid>
                                                <CheckWrap />
                                            </Grid>
                                        </Collapse>
                                        <Collapse in={forms.payment_method === 'card'} timeout="auto">
                                            <Grid className="cardType">
                                                <Link to='/order_received' className="cBtn cBtnLarge cBtnTheme mt-20 ml-15" type="submit">Proceder al Pago</Link>
                                            </Grid>
                                        </Collapse>
                                    </Collapse>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Grid className="cartStatus">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid className="cartTotals">
                                        <h4>Total del Carrito</h4>
                                        <Table>
                                            <TableBody>
                                                {cartList.map(item => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>{item.title} ${item.price} x {item.qty}</TableCell>
                                                        <TableCell
                                                            align="right">${item.qty * item.price}</TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow className="totalProduct">
                                                    <TableCell>Total Habitaciones</TableCell>
                                                    <TableCell align="right">{cartList.length}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Subtotal</TableCell>
                                                    <TableCell align="right">${totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Precio Total</TableCell>
                                                    <TableCell
                                                        align="right">${totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
};


export default CheckoutSection;