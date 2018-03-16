import React, { Component } from 'react';
import AuthService from './Auth';

export const replace = (path = '/') =>
    window.location = path;