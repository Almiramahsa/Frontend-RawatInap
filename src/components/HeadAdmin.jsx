import { Button, ButtonGroup } from '@chakra-ui/button';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { CiFilter, CiSearch } from 'react-icons/ci';
import { IoAddOutline } from 'react-icons/io5';

const HeadAdmin = ({ title }) => {
    return (
        <Flex
            bg='white'
            p={{ base:'2', sm:'5', md:'10' }}
            wrap='wrap'
            justifyContent={{ base:'center', sm:'space-between' }}
        >
            <Text
                fontSize={'20px'}
                fontWeight={'600'}
                color={'#1FA8F6'}
            >
                {title}
            </Text>
            <Flex
                color={'#333333'}
                gap='5'
                pt={{ base:'5', sm:'0' }}
                width={{ base:'100%', sm:'auto' }}
                justifyContent={'center'}
            >
                <ButtonGroup>
                    <Button
                        bg='transparent'
                        border='1px'
                        borderColor={'#E0E0E0'}
                    >
                        <IoAddOutline
                            fontSize={'30px'}
                        />
                    </Button>
                    <Button
                        bg='transparent'
                        border='1px'
                        borderColor={'#E0E0E0'}
                    >
                        <CiSearch
                            fontSize={'30px'}
                        />
                    </Button>
                    <Button
                        bg='transparent'
                        border='1px'
                        borderColor={'#E0E0E0'}
                    >
                        <CiFilter
                            fontSize={'32px'}
                        />
                    </Button>
                </ButtonGroup>
            </Flex>
        </Flex>
    );
}

export default HeadAdmin;
