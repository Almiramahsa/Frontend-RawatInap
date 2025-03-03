import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Text,
  Flex,
  Input,
  Spacer,
  Checkbox,
  Button,
  useToast,
  Select,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react-use-disclosure';
import api from '../services/api';
import { AuthToken } from '../services/authToken';
import Loading from '../components/Loading';

function DetailDaftarRumahSakit() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = Cookies.get('token');
  const user = useSelector((state) => state.users);
  const toast = useToast();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState();
  const [patientSelected, setPatientSelected] = useState();
  const location = useLocation();
  const [nameHospital, setNameHospital] = useState();
  const hospital_id = parseInt(location.state?.hospital_id);
  const patient_id = parseInt(patientId);
  const auth = AuthToken();
  const [loading, setLoading] = useState(true);

  const date = new Date();
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', `Jum'at`, 'Sabtu'];

  const day = date.getDate();
  const month = date.getMonth();
  const thisDay = date.getDate();
  const yy = date.getFullYear();

  const getPatientsByUserId = async () => {
    await api
      .getPatientByUserId(token, user.id)
      .then((response) => {
        const data = response.data.data;
        setPatients(data);
        toast({
          position: 'top',
          title: 'Berhasil mendapatkan data pasien',
          status: 'success',
          duration: '2000',
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          position: 'top',
          title: 'Gagal mendapatkan data pasien',
          status: 'error',
          duration: '2000',
          isClosable: true,
        });
      });
    setLoading(false);
  };

  const getDetailHospitalHandler = async () => {
    await api
      .getHospitalByID(token, location.state?.hospital_id)
      .then((response) => {
        const data = response.data.data;

        setNameHospital(data.nama);
      })
      .catch((error) => {});
  };

  const getPatientById = async (id) => {
    await api
      .getPatientById(token, id)
      .then((response) => {
        const data = response.data.data;
        setPatientSelected(data);
        toast({
          position: 'top',
          title: 'Berhasil mendapatkan data pasien',
          status: 'success',
          duration: '2000',
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          position: 'top',
          title: 'Gagal mendapatkan data pasien',
          status: 'error',
          duration: '2000',
          isClosable: true,
        });
      });
  };

  const handlerSelectPatient = () => {
    getPatientById(patientId);
    onClose();
  };

  const handlerRegistrasi = () => {
    navigate('/registrasi/pasien/konfirmasi', {
      state: {
        hospital_id: hospital_id,
        patient_id: patientId,
      },
    });
  };

  useEffect(() => {
    if (!auth) {
      toast({
        position: 'top',
        title: 'Kamu Harus Login Dulu',
        status: 'warning',
        duration: '2000',
        isClosable: true,
      });
      navigate('/login');
    }
    getPatientsByUserId();
    getDetailHospitalHandler();
  }, []);

  return (
    <>
      {loading && <Loading body={'Tunggu Sebentar'} />}
      {!loading && (
        <Layout>
          <Box px={{ base: '5', sm: '10', xl: '36' }} py={10} my={10}>
            <Flex direction={{ base: 'column', xl: 'row' }}>
              <Box mr={{ base: '0', lg: '30px' }} className="basis-3/4">
                <Box borderWidth={'2px'} p="5" rounded={'10px'}>
                  <Text fontWeight={'semibold'}>Login sebagai</Text>
                  <Text color={'gray'}>{user.nama}</Text>
                </Box>
                <Box borderWidth={'2px'} p="5" rounded={'10px'} mt={5} py="10">
                  <Box>
                    <Flex justifyContent={'space-between'}>
                      <Text fontWeight={'semibold'}>Data Pemesan</Text>
                    </Flex>
                  </Box>
                  <Box mx={5} mt={10}>
                    <FormControl>
                      <Box>
                        <Flex direction={{ base: 'column', xl: 'row' }}>
                          <Box flexBasis={'100%'}>
                            <FormLabel>Nama Pemesan</FormLabel>
                            <Input type="text" disabled value={user.nama} _disabled={{ color: 'black' }} />
                          </Box>
                        </Flex>
                      </Box>
                      <Box mt={5}>
                        <Flex direction={{ base: 'column', xl: 'row' }}>
                          <Box flexBasis={'45%'}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" disabled value={user.email} _disabled={{ color: 'black' }} />
                          </Box>
                          <Spacer />
                          <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                            <FormLabel>No. Handphone</FormLabel>
                            <Input type="string" _disabled={{ color: 'black' }} disabled value={user.no_telpon ? user.no_telpon : 'tidak ada'} />
                          </Box>
                        </Flex>
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
                <Box borderWidth={'2px'} p="5" rounded={'10px'} mt={5} py="10">
                  <Box>
                    <Flex justifyContent={'space-between'}>
                      <Text fontWeight={'semibold'}>Detail Pasien</Text>
                      <Button onClick={onOpen} bg={'#3AB8FF'} _hover={{ bg: 'alta.primary' }} color={'white'}>
                        Pilih Data Pasien
                      </Button>
                    </Flex>
                  </Box>
                  <Box mx={5} mt={10}>
                    <FormControl>
                      <Box>
                        <FormLabel>Nama Depan</FormLabel>
                        <Input type="text" disabled _disabled={{ color: 'black' }} value={patientSelected?.nama_pasien} />
                      </Box>
                      <Box mt={5}>
                        <Flex direction={{ base: 'column', lg: 'row', xl: 'row' }}>
                          <Box flexBasis={'45%'}>
                            <FormLabel>No. KTP</FormLabel>
                            <Input type="number" disabled _disabled={{ color: 'black' }} value={patientSelected?.nik} />
                          </Box>
                          <Spacer />
                          <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                            <FormLabel>No. BPJS</FormLabel>
                            <Input type="number" disabled _disabled={{ color: 'black' }} value={patientSelected?.no_bpjs} />
                          </Box>
                        </Flex>
                      </Box>
                      <Box mt={5}>
                        <Flex direction={{ base: 'column', lg: 'row', xl: 'row' }}>
                          <Box flexBasis={'45%'}>
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <Input type="text" disabled _disabled={{ color: 'black' }} value={patientSelected?.jenis_kelamin} />
                          </Box>
                          <Spacer />
                          <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                            <FormLabel>Usia</FormLabel>
                            <Input type="number" disabled _disabled={{ color: 'black' }} value={patientSelected?.usia} />
                          </Box>
                        </Flex>
                      </Box>
                      <Box mt={5}>
                        <Flex direction={{ base: 'column', lg: 'row', xl: 'row' }}>
                          <Box flexBasis={'45%'}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" disabled _disabled={{ color: 'black' }} value={patientSelected?.email_wali} />
                          </Box>
                          <Spacer />
                          <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                            <FormLabel>No. Handphone Wali</FormLabel>
                            <Input type="number" disabled _disabled={{ color: 'black' }} value={patientSelected?.no_telpon_wali} />
                          </Box>
                        </Flex>
                      </Box>
                      <Box mt={5}>
                        <FormLabel>Alamat Domisili</FormLabel>
                        <Input type="text" disabled _disabled={{ color: 'black' }} value={patientSelected?.alamat_domisili} />
                      </Box>
                      <Box mt={5}>
                        <Flex direction={{ base: 'column', lg: 'row', xl: 'row' }}>
                          <Box flexBasis={'45%'}>
                            <FormLabel>Provinsi</FormLabel>
                            <Input type="text" disabled _disabled={{ color: 'black' }} value={patientSelected?.provinsi_domisili} />
                          </Box>
                          <Spacer />
                          <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                            <FormLabel>Kabupaten / Kota</FormLabel>
                            <Input type="string" disabled _disabled={{ color: 'black' }} value={patientSelected?.kabupaten_kota_domisili} />
                          </Box>
                        </Flex>
                      </Box>
                      <Box mt={10}>
                        <Checkbox defaultChecked>Semua data telah terisi dengan sebenar-benarnya</Checkbox>
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
                <Box mt={10} mb={20} textAlign={'end'}>
                  <Button bg={patientId ? '#3AB8FF' : '#f7f7f7'} _hover={{ bg: 'alta.primary' }} color={patientId ? 'white' : '#15192080'} p={6} onClick={() => handlerRegistrasi()} disabled={patientId ? false : true}>
                    Lanjutkan Pendaftaran →
                  </Button>
                </Box>
              </Box>
              <Box>
                <Box borderWidth={'2px'} p="12" rounded={'10px'}>
                  <Text fontWeight={'semibold'} textAlign="center">
                    Pendaftaran Kamar Rawat Inap
                  </Text>
                  <Box borderTop={'1px'} mt={'5'} pt={'5'}>
                    <Flex justifyContent={'space-between'}>
                      <Text>Hari:</Text>
                      <Text>{myDays[thisDay - 1]}</Text>
                    </Flex>
                  </Box>
                  <Flex justifyContent={'space-between'} mt={5}>
                    <Text>Tanggal:</Text>
                    <Text>{day + ' ' + months[month] + ' ' + yy}</Text>
                  </Flex>
                  <Flex justifyContent={'space-between'} mt={5}>
                    <Text>Rumah Sakit:</Text>
                    <Text>{nameHospital}</Text>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>

          <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Pilih Pasien</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Pasien Terdaftar pada Akun</FormLabel>
                  <Select placeholder="Pilih Pasien" id="patient" onChange={(e) => setPatientId(e.target.value)}>
                    {patients?.map((data, index) => (
                      <option value={data.id} key={index}>
                        {data.nama_pasien}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => handlerSelectPatient()} bg={'#3AB8FF'} _hover={{ bg: 'alta.primary' }} color={'white'}>
                  Pilih
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Layout>
      )}
    </>
  );
}

export default DetailDaftarRumahSakit;
