import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import BackArrow from '../assets/images/back.png';
import LinePattern from '../assets/images/linePattern.png';
import Info from '../assets/images/info.png';
import ArrowDown from '../assets/images/arrowDown.png';

const Medications = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dosage = ['Mg'];
  const quantity = ['Daily'];
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onNext = async () => {
    await axios
      .get('https://postman-echo.com/get?foo1=bar1&foo2=bar2')
      .then(res => {
        alert(JSON.stringify(res.data));
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={BackArrow} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={styles.linePatternView}>
          <Image source={LinePattern} />
        </View>
        <Text style={styles.title}>Do you take any Medications?</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.checkboxView}>
          <CheckBox
            onClick={() => setIsChecked(!isChecked)}
            isChecked={isChecked}
            style={{
              paddingLeft: 20,
              paddingRight: 15,
            }}
          />
          <Text style={styles.checkboxText}>
            No, I don’t take any medications
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: -20}}>
          <View style={styles.form}>
            <Text style={styles.label}>Medication Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Type your Medication Here"
              placeholderTextColor="#222222"
            />
            <Text style={styles.label}>Amount</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="Type..."
                placeholderTextColor="#222222"
              />
              <SelectDropdown
                data={dosage}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonStyle={{
                  width: 140,
                  borderRadius: 10,
                  backgroundColor: '#F5F5F7',
                }}
                defaultButtonText="Mg"
                buttonTextStyle={{textAlign: 'left'}}
                renderDropdownIcon={() => {
                  return <Image source={ArrowDown} />;
                }}
              />
            </View>
            <Text style={styles.label}>Number</Text>
            <View style={styles.inputRow}>
              <TextInput style={[styles.input, styles.smallInput]} value="2" />
              <SelectDropdown
                data={quantity}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonStyle={{
                  width: 140,
                  borderRadius: 10,
                  backgroundColor: '#F5F5F7',
                }}
                defaultButtonText="Daily"
                buttonTextStyle={{textAlign: 'left'}}
                renderDropdownIcon={() => {
                  return <Image source={ArrowDown} />;
                }}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.label}>Duration</Text>
              <View style={styles.labelRow}>
                <Image source={Info} />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={[
                styles.input,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Text style={{width: '92%', color: '#222222'}}>Select date</Text>
              <Image source={ArrowDown} />
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
              locale="en"
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.label}>Additional Information</Text>
              <View style={styles.labelRow}>
                <Image source={Info} />
              </View>
            </View>
            <TextInput
              style={[
                styles.input,
                {height: 96, textAlignVertical: 'top', paddingTop: 15},
              ]}
              placeholder="Write more information"
              placeholderTextColor="#222222"
              multiline={true}
            />
            <View style={styles.bottomSpace} />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addBtnText}>+ Add Medication</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={onNext}>
              <Text style={styles.nextBtnText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D9D9E',
  },
  header: {
    width: '100%',
    height: 320,
    backgroundColor: '#1D9D9E',
  },
  backArrow: {
    marginLeft: 20,
    marginTop: 55,
  },
  linePatternView: {
    position: 'absolute',
    right: -260,
    top: -170,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '600',
    paddingTop: 90,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#E7E7EB',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'relative',
    top: -28,
  },
  checkboxText: {
    color: '#222222',
    fontSize: 15,
    width: '85%',
  },
  form: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  labelRow: {
    paddingLeft: 10,
    paddingTop: 5,
  },
  label: {
    color: '#222222',
    fontSize: 15,
    paddingBottom: 10,
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#F5F5F7',
    borderRadius: 10,
    height: 48,
    paddingLeft: 15,
    color: '#222222',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  smallInput: {
    width: 140,
  },
  bottomSpace: {
    paddingBottom: 40,
  },
  buttons: {
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#ffffff',
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#1D9D9E',
    fontSize: 15,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#EB2025',
    marginTop: 20,
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 34,
  },
  nextBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Medications;
