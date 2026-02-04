import { COLORS, SPACING } from '@/constants/theme';
import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  actions: Array<{
    text: string;
    onPress: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }>;
}

export default function ActionModal({ visible, onClose, title, actions }: ActionModalProps) {
  const handleBackdropPress = () => {
    onClose();
  };

  const getActionStyle = (style?: string) => {
    switch (style) {
      case 'destructive':
        return styles.destructiveAction;
      case 'cancel':
        return styles.cancelAction;
      default:
        return styles.defaultAction;
    }
  };

  const getActionTextStyle = (style?: string) => {
    switch (style) {
      case 'destructive':
        return styles.destructiveText;
      case 'cancel':
        return styles.cancelText;
      default:
        return styles.defaultText;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={handleBackdropPress}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalContent}>
            <Text style={styles.title}>{title}</Text>
            
            <View style={styles.actionsContainer}>
              {actions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.actionButton,
                    getActionStyle(action.style)
                  ]}
                  onPress={() => {
                    action.onPress();
                    onClose();
                  }}
                >
                  <Text style={[
                    styles.actionText,
                    getActionTextStyle(action.style)
                  ]}>
                    {action.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    maxWidth: 320,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
    textAlign: 'center',
  },
  actionsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionButton: {
    padding: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  defaultAction: {
    backgroundColor: COLORS.white,
  },
  destructiveAction: {
    backgroundColor: COLORS.white,
  },
  cancelAction: {
    backgroundColor: COLORS.white,
    fontWeight: '600',
  },
  actionText: {
    fontSize: 16,
  },
  defaultText: {
    color: COLORS.primary,
  },
  destructiveText: {
    color: COLORS.danger,
  },
  cancelText: {
    color: COLORS.text,
    fontWeight: '600',
  },
});
