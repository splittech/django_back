import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaOdnoklassniki } from "react-icons/fa";

export default function Footer(props) {

    return (
        <footer className='footer'>
            <div className='footer__container'>
                <div className='footer__useful-links useful-links'>
                    <h1 className='footer__useful-links-h1 useful-links-h1'>Полезные ссылки</h1>
                    <ul className='footer__useful-links-list useful-links-list'>
                        <li className='footer__useful-links-item useful-links-item'>
                            <a href='#' className='footer__useful-links-link useful-links-link'><FaVk className='useful-links-icon' /> ВКонтакте</a>
                        </li>
                        <li className='footer__useful-links-item useful-links-item'>
                            <a href='#' className='footer__useful-links-link useful-links-link'><FaTelegram className='useful-links-icon' /> Телеграмм</a>
                        </li>
                        <li className='footer__useful-links-item useful-links-item'>
                            <a href='#' className='footer__useful-links-link useful-links-link'><FaOdnoklassniki className='useful-links-icon' /> Одноклассники</a>
                        </li>
                    </ul>
                </div>
                <div className='footer__contacts contacts'>
                    <h1 className='footer__contacts-h1 contacts-h1'>Контакты</h1>
                    <ul className='footer__contacts-list contacts-list'>
                        <li className='footer__contacts-item contacts-item'>
                            <a href='#' className='footer__contacts-link contacts-link'><FaPhoneAlt className='contacts-icon' /> +7 (999) 999-99-99 </a>
                        </li>
                        <li className='footer__contacts-item contacts-item'>
                            <a href='#' className='footer__contacts-link contacts-link'><FaEnvelope className='contacts-icon' /> library@mail.com</a>
                        </li>
                        <li className='footer__contacts-item contacts-item'>
                            <a href='#' className='footer__contacts-link contacts-link'><FaMapMarkerAlt className='contacts-icon' /> ул. Суворова, д. 1 </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer >
    )
}