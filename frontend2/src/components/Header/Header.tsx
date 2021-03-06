import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logoImg from '../../images/falcon-logo-1.png';
import menuIcon from '../../images/menu.png';
import closeIcon from '../../images/close.png';
import { delete_cookie, useAuth } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";
import { HttpService } from "../../utils/HttpService";
import { User } from "../../models/User.entity";
import { getUser } from "../../utils/util-functions";

const Header = ({ isMain }) => {

  const [aut, setAut] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  useEffect(() => {
    HttpService.checkAuth()
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.data.payload.user))
        setAut(true)
      })
      .catch(responst => {
        setAut(false)
      });
  }, [])

  useEffect(() => {
    const user = getUser();
    if (!user) return;
    HttpService.getUserData(user.id)
      .then(axiosResponse => {
        setUserData(axiosResponse.data.payload)
      }).catch(console.log);
  }, [])

  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    delete_cookie('connect.sid')
    localStorage.removeItem('user');
    navigate('/')
  }

  const [scroll, setScroll] = useState(!isMain);

  // if (isMain)
  //   setScroll(true);

  window.addEventListener("scroll", () => {
    if (isMain) {
      if (window.scrollY > 50)
        setScroll(true);
      else
        setScroll(false);
    }
  })

  const [menu, setMenu] = useState(false);

  const menuClicked = () => {
    if (menu)
      setMenu(false);
    else
      setMenu(true);
  }

  const [toggleProfile, setToggleProfile] = useState(false);
  const [toggleMySpecies, setToggleMySpecies] = useState(false);
  const [toggleMyAnimals, setToggleMyAnimals] = useState(false);

  return (
    <div className={scroll ? styles.headerContainer + " " + styles.scroll : styles.headerContainer}>
      <a className={styles.logoImg} href={'#'}>
        <img src={logoImg} />
      </a>

      <a onClick={menuClicked} className={menu ? styles.menu + " " + styles.clicked : styles.menu}>
        {menu ? <img src={closeIcon} /> : <img src={menuIcon} />}
        <ul className={menu ? styles.respNavItems + " " + styles.active : styles.respNavItems}>
          <li>
            <a href={'#'}>Home</a>
          </li>
          <li>
            <a href={'#'}>About</a>
          </li>
          <li>
            <a href={'#'}>News</a>
          </li>
          <li>
            <a href={'/login'}>Log in</a>
          </li>
        </ul>
      </a>

      <ul className={styles.navItems}>
        <li>
          <a href={'/#'}>Home</a>
        </li>
        <li>
          <a href={'/endangeredspecies'}>Species</a>
        </li>
        <li>
          <a href={'/news'}>News</a>
        </li>
        {localStorage.getItem('user') ?
          <>
            <li>
              <a onClick={() => {
                if (toggleMySpecies)
                  setToggleMySpecies(false)
                else
                  setToggleMySpecies(true)
              }}>My Species {toggleMySpecies ? <span>???</span> : <span>???</span>}</a>
              <div className={toggleMySpecies ? styles.subProfile + " " + styles.subNotProfile + " " + styles.active : styles.subProfile + " " + styles.subNotProfile}>


                {userData && userData.species && userData.species.map(species => {
                  return <a href={`/species/${species.id}`}>{species.name}</a>
                })}
              </div>
              {/*{toggleMySpecies ?*/}
              {/*  <div className={styles.subProfile + " " + styles.subNotProfile}>*/}
              {/*    <a>Penguin</a>*/}
              {/*    <a>Rhino</a>*/}
              {/*  </div> : <></>}*/}
            </li>
            <li>
              <a onClick={() => {
                if (toggleMyAnimals)
                  setToggleMyAnimals(false)
                else
                  setToggleMyAnimals(true)
              }}>My Animals {toggleMyAnimals ? <span>???</span> : <span>???</span>}</a>
              <div className={toggleMyAnimals ? styles.subProfile + " " + styles.subNotProfile + " " + styles.active : styles.subProfile + " " + styles.subNotProfile}>
                {userData && userData.animalProfiles && userData.animalProfiles.map(animalProfile => {
                  return <a href={`/animal/${animalProfile.id}`}>{animalProfile.species?.name + " - " + animalProfile.name}</a>
                })}
              </div>
            </li>
            <li>
              {/*<a onClick={handleLogOut}>Profile</a>*/}
              <a onClick={() => {
                if (toggleProfile)
                  setToggleProfile(false)
                else
                  setToggleProfile(true)
              }}>Profile {toggleProfile ? <span>???</span> : <span>???</span>}</a>
              <div className={toggleProfile ? styles.profileSub + " " + styles.subProfile + " " + styles.active : styles.profileSub + " " + styles.subProfile}>
                <a>{JSON.parse(localStorage.getItem('user')!).email}</a>
                <a>{JSON.parse(localStorage.getItem('user')!).name}</a>
                <a className={styles.logoutBtn} onClick={handleLogOut}>Logout</a>
              </div>
              {/*{toggleProfile ?*/}
              {/*  <div className={styles.subProfile}>*/}
              {/*    <a>{JSON.parse(localStorage.getItem('user')!).email}</a>*/}
              {/*    <a>{JSON.parse(localStorage.getItem('user')!).name}</a>*/}
              {/*    <a className={styles.logoutBtn} onClick={handleLogOut}>Logout</a>*/}
              {/*  </div> : <></>*/}
              {/*}*/}
            </li>
          </>
          :
          <li>
            <a href={'/login'}>Log in</a>
          </li>
        }


      </ul>
    </div>
  )
}

export default Header;