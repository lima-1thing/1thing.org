import React, { Component, Fragment } from 'react'
import { Button, Input } from "reactstrap";
import { Link, Switch, Route } from "react-router-dom";
import styles from './Footer.module.scss';

export default class Footer extends Component {
    render() {
        return (
            <footer>

                <section className={styles.subscribe}>
                    <h3>Stay tune and sign up for newsletter. ✊</h3>
                    <section className={styles.email}>
                        <input placeholder='Email address'></input>
                        <Button color="onething" type="button"> Subscribe</Button>
                        {/* <button>Subscribe</button> */}
                    </section>
                </section>

                <section className={styles.rightSide}>
                    <section className={styles.socialMedia}>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                        <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                    </section>

                    <article>
                        1 Thing Agaist Racism © 2021
                    </article>
                </section>

            </footer>
        )
    }
}
