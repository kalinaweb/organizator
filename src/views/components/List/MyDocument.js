import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles

Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    fontFamily : "Roboto"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
});

// Create Document Component
export const MyDocument = ({ data }) => ( // 
  <Document>
    <Page size="A4" style={styles.page}>      
      <View style={styles.section}>
        <Text>{data}</Text>
      </View>
    </Page>
  </Document>
);