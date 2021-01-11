import React from 'react'
import {Container, Heading, Content, Headings, Humidity, HumidityInPercent, Progress} from './styles/details';

export default function WeatherDetails({children, ...restProps}) {
    return (<Container {...restProps}>{children}</Container>);
}

WeatherDetails.Heading = function WeatherDetailsHeading({children, ...restProps}) {
    return (<Heading {...restProps}>{children}</Heading>)
}

WeatherDetails.Content = function WeatherDetailsContent({children, ...restProps}) {
    return (<Content {...restProps}>{children}</Content>)
}

WeatherDetails.Headings = function WeatherDetailsHeadings({children, ...restProps}) {
    return (<Headings {...restProps}>{children}</Headings>)
}

WeatherDetails.Humidity = function WeatherDetailsHumidity({children, ...restProps}) {
    return (<Humidity {...restProps}>{children}</Humidity>)
}

WeatherDetails.HumidityInPercent = function WeatherDetailsHumidityInPercent({children, ...restProps}) {
    return (<HumidityInPercent {...restProps}>{children}</HumidityInPercent>)
}

WeatherDetails.Progress = function WeatherDetailsProgress({children, ...restProps}) {
    return (<Progress {...restProps}>{children}</Progress>)
}
