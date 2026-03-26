import styled from "styled-components/native";

export const CalendarContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
`

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 32px 24px;
  background-color: #1e3a8a;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`

export const PageTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-top: 16px;
`

export const EventCard = styled.View`
  background-color: white;
  margin: 16px 24px 0 24px;
  padding: 16px;
  border-radius: 12px;
  elevation: 2;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
`

export const EventHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
  padding-bottom: 8px;
  margin-bottom: 8px;
`

export const EventTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`

export const EventTypeBadge = styled.View`
  background-color: ${props => props.type === 'fixed' ? '#dbeafe' : '#fce7f3'};
  padding: 4px 8px;
  border-radius: 8px;
`

export const EventTypeText = styled.Text`
  font-size: 12px;
  color: ${props => props.type === 'fixed' ? '#1d4ed8' : '#be185d'};
  font-weight: bold;
`

export const EventDescription = styled.Text`
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 12px;
`

export const EventDateRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const EventDateText = styled.Text`
  font-size: 14px;
  color: #6b7280;
  font-weight: bold;
`

export const EmptyEventsText = styled.Text`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin-top: 32px;
`
