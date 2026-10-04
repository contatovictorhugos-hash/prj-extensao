import styled from "styled-components/native";

export const PrayerContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 32px 24px 24px 24px;
  background-color: #312e81;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const HeaderTitleContainer = styled.View`
  flex: 1;
  margin-right: 16px;
`;

export const PageTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-top: 12px;
`;

export const SubTitle = styled.Text`
  font-size: 15px;
  color: #c7d2fe;
  margin-top: 4px;
  line-height: 20px;
`;

export const AddPrayerButton = styled.TouchableOpacity`
  background-color: #4f46e5;
  padding: 10px 14px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
`;

export const AddPrayerButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

export const FilterTabsContainer = styled.View`
  flex-direction: row;
  padding: 16px 24px 8px 24px;
  gap: 8px;
`;

export const FilterTabButton = styled.TouchableOpacity`
  padding: 8px 14px;
  border-radius: 20px;
  background-color: ${props => props.active ? '#312e81' : '#e0e7ff'};
`;

export const FilterTabText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: ${props => props.active ? '#ffffff' : '#4338ca'};
`;

export const PrayerCard = styled.View`
  background-color: white;
  margin: 12px 24px 4px 24px;
  padding: 16px;
  border-radius: 14px;
  elevation: 2;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.06);
  border-left-width: 4px;
  border-left-color: ${props => {
    if (props.urgent) return '#ef4444';
    if (props.visibility === 'confidential') return '#8b5cf6';
    return '#4f46e5';
  }};
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const AuthorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const AvatarImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const AvatarPlaceholder = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #e0e7ff;
  align-items: center;
  justify-content: center;
`;

export const AuthorMeta = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const AuthorName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #1f2937;
`;

export const PrayerDate = styled.Text`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 2px;
`;

export const ActionIconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const BadgeContainer = styled.View`
  flex-direction: row;
  gap: 6px;
  margin-bottom: 8px;
`;

export const Badge = styled.View`
  padding: 3px 8px;
  border-radius: 6px;
  background-color: ${props => {
    if (props.variant === 'urgent') return '#fee2e2';
    if (props.variant === 'confidential') return '#ede9fe';
    return '#e0e7ff';
  }};
`;

export const BadgeText = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${props => {
    if (props.variant === 'urgent') return '#dc2626';
    if (props.variant === 'confidential') return '#7c3aed';
    return '#4338ca';
  }};
`;

export const PrayerMessage = styled.Text`
  font-size: 15px;
  color: #374151;
  line-height: 22px;
  margin-bottom: 12px;
`;

export const CardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #f3f4f6;
  padding-top: 10px;
  margin-top: 4px;
`;

export const PrayingButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  background-color: ${props => props.isSupported ? '#fef2f2' : '#f3f4f6'};
  border-width: 1px;
  border-color: ${props => props.isSupported ? '#fca5a5' : '#e5e7eb'};
`;

export const PrayingButtonText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.isSupported ? '#e11d48' : '#4b5563'};
`;

export const PrayingCounterBadge = styled.View`
  background-color: ${props => props.isSupported ? '#e11d48' : '#9ca3af'};
  padding: 2px 7px;
  border-radius: 10px;
`;

export const PrayingCounterText = styled.Text`
  font-size: 11px;
  color: white;
  font-weight: bold;
`;

export const ConfidentialNotice = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const ConfidentialNoticeText = styled.Text`
  font-size: 12px;
  color: #7c3aed;
  font-style: italic;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #4b5563;
  margin-top: 12px;
  text-align: center;
`;

export const EmptySubText = styled.Text`
  font-size: 14px;
  color: #9ca3af;
  margin-top: 4px;
  text-align: center;
`;
