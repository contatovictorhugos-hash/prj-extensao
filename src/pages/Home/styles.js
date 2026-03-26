import styled from "styled-components/native";

export const HomeContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
`

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 32px 24px;
  background-color: #2b303a;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`

export const GreetingText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-top: 16px;
`

export const SubTitle = styled.Text`
  font-size: 16px;
  color: #d1d5db;
  margin-top: 4px;
`

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin: 24px 24px 16px 24px;
`

export const NewsCard = styled.View`
  background-color: white;
  margin: 0 24px 16px 24px;
  padding: 16px;
  border-radius: 12px;
  elevation: 3;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  border-left-width: 4px;
  border-left-color: ${props => props.priority === 'high' ? '#ef4444' : '#3b82f6'};
`

export const NewsMessage = styled.Text`
  font-size: 16px;
  color: #374151;
  line-height: 24px;
`

export const NewsDate = styled.Text`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 8px;
  text-align: right;
`

export const EmptyNewsText = styled.Text`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin-top: 16px;
`
