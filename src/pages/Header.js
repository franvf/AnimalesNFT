import React from 'react';
import {Menu, Button, Image, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import logo from '../img/logo.png'

export default() => {

    return(
        <Segment inverted>  
            <Menu inverted>
                <Menu.Item inverted>
                    <Image src={logo} size="small" as='a' href='http://vivatopia.es'/> 
                </Menu.Item>
                <Menu.Item floated='right'>
                    <Button basic inverted color='violet' floated='right' as={Link} to='/presale'>Preventa</Button>
                </Menu.Item>
                <Menu.Item floated='left'>
                    <Button basic inverted color='yellow' floated='right' as={Link} to='/'>Admin</Button>  
                </Menu.Item>
            </Menu>
        </Segment>
    );
}