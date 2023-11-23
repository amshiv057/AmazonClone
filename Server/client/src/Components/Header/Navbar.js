import { React, useContext, useEffect, useState } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../../Context/ContextProvider";
import Rightheader from "../Home/Rightheader";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { account, setAccount } = useContext(LoginContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const history = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState();
  console.log(text);
  const [liopen, setLiopen] = useState(true);
  const { products } = useSelector((state) => state.getproductsdata);

  const [dropen, setDropen] = useState(false);
  // console.log(account);

  const getvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };
  const handleopen = () => {
    setDropen(true);
  };

  const handleclose = () => {
    setDropen(false);
  };

  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data2 = await res2.json();
    // console.log(data);

    if (res2.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      // alert("user logout");
      toast.success("User Logout!", {
        position: "top-center",
      });
      history("/");
      setAccount(false);
    }
  };

  const getText = (items) => {
    setText(items);
    setLiopen(false);
  };

  useEffect(() => {
    getvaliduser();
  }, []);
  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={dropen} onClose={handleclose}>
            <Rightheader logClose={handleclose} logoutuser={logoutuser} />
          </Drawer>

          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              placeholder="Search Your Products"
              onChange={(e) => getText(e.target.value)}
              name=""
              id=""
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => {
                    return (
                      <ListItem>
                        <NavLink
                          to={`/getproductsone/${product.id}`}
                          onClick={() => setLiopen(true)}
                        >
                          {product.title.longTitle}
                        </NavLink>
                      </ListItem>
                    );
                  })}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">signin</NavLink>
          </div>
          {account ? (
            <NavLink to="/buynow">
              <div className="cart_btn">
                <Badge
                  badgeContent={
                    account && account.carts ? account.carts.length : 0
                  }
                  color="secondary"
                >
                  <ShoppingCartIcon id="icon" />
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>
                <p>Cart</p>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <div className="cart_btn">
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon id="icon" />
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>
                <p>Cart</p>
              </div>
            </NavLink>
          )}
          {account ? (
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.fname && account.fname.length > 0
                ? account.fname[0].toUpperCase()
                : ""}
            </Avatar>
          ) : (
            <Avatar
              className="avtar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></Avatar>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account ? (
              <MenuItem
                onClick={() => {
                  handleClose();
                  logoutuser();
                }}
                style={{ margin: "10px" }}
              >
                <LogoutIcon style={{ fontSize: "16px", margin: "3px" }} />
                Logout
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
          <ToastContainer />
        </div>
      </nav>
    </header>
  );
}
