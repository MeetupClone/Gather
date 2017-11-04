import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar'
import  {connect} from 'react-redux'
import moment from 'moment'

BigCalendar.momentLocalizer(moment);

const MyCalendar = props => (
  <div>
    <BigCalendar
      events={[]}
      startAccessor="startDate"
      endAccessor="endDate"
    />
  </div>
);

export default MyCalendar
