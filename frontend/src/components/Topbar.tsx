
const Contacts = () =>{
    return(
        <div className="flex">
            {/* <img alt="insta" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAdVBMVEX/AAD/////oKD/+vr/3Nz/W1v/XV3/hIT/V1f/8/P/9vb/5ub/4OD/Y2P/4+P/iIj/tLT/6+v/wMD/q6v/j4//k5P/0dH/xcX/mJj/cXH/RET/Hh7/EBD/sLD/NDT/p6f/d3f/aWn/PDz/fn7/TEz/LS3/JiYKMV6QAAAFDUlEQVR4nO2d6XaqMBRGG4IDRJFBmawSq/X9H/EmWL3WoQ7k5ISs7L9dhbMXCCae5PsgFvGBXYBKnIypOBlTcTKm4mRMxcmYipMxFSdjKk7GVJyMqTgZU3EyptJRhgrCMAyOJAljLJq0+PcRf40ixpIkOf2nOIo4FrhMKEuMosjP87xI0ziOV6ssy5rG88rFYj6fSUYtW86rarOZtgyGgvEvhkem082mqjjn28M/tseYzxdl6XmZZLWK4zQtijz3xamFdhB2lAnyeDEb8Z/yBuNd/bX+3i+Xn4IPSOQJlvvv9Ve9Gw/kuYU6H80WcR68J5PEfFp/g9b8Mt/1dLtiL8sUVb3HLv02+5oXL8mkNext1JHPOn1aJl9iV/uYz/wpmYRjF/ocPHkoQ1NDPyrX7NPLp/WFTFL24BY78rlI/pKJOHaBr8Gj+zLRFLu6V9lE92TYALu21xmw2zLhGLuydxiHN2V6eF0kw1syC+yq3mVxLVNg1/Q+xaVM0Jt35TX74EJmhF1RF0a/ZYo1dkFdWBfnMmGFXU83Knomk/b6wohLk/6XCXv9iZGMwpNMXmMX05U6P8k02LV0pznKsJ5//CVV8iPThzH/I5b5j0yMXYkK0oNMMMMuRAWzoJVhvRzHXDJmrYyPXYca/FYmxy5DDXkrk2KXoYZUytAMuww1ZFTKWPD+lzStjIddhho8J2MoTsZUnMwjsH4NBZHZeRu1B3wSEJnhJMkw2gdAZAY+oQxhiAQlQwidfKk96mPgZITOSvOTAFKGkHCmVQdWRgz7NhrnfaBlCFkN1R78D+BlSFLu1B7+LhpkxL020/OjnBYZQlOu9gy30SMjmwo13Gu6ZAiJSvDHtD4ZQsH7cjTKEPBOA70yhIAOA3XLEMbhHtPaZcS9NoX6hoMgQ4IG6BcUDBlC/BJkIIojI+61rdpTtmDJkCBV36mHJiOea5nqDhdEGUKZ4h4XTBlBrnTSA1lGDEQVfv1ElyF0q+wxjS8jJz0UfcMxQYbQ1VDJzWaEjBi5NSoGoobIEF/FK9QMmcAbq7jPjJBJh2oGBQbIJKoeZgbIKFxNgS1TqJx/QpWhvtrJJ0wZ5dOCeDIAE7ZYMjQF6KRGksnnEBPPKDKshFl5gCBDV0q+u9xAv0wONqGpXYaOAH+l0SwD26arU4b6wEvB9MlQH3wlmDYZ1sCv0NMkE8Q6+jT0yBRcS0OQDpnJSFPnGbwM9XS1zsDLpAN9LWfAMkmls3sOVCbU3PwNKBMWuhd/gsmEvv5GbRiZCZmUag/5FDAyhY7usmtAZNZQQ8kHuCUnpuJkTMXJmIpn33JgmxZqW7WE3q7NDazadsKqDUGs2qrFqk107NreyKqNp6zaEsyuzdqs2kbPqg0OCe35I6AKz2Ss2hTUru1aSWBY0MQrXG2ka9UWx3ZtPk2IvqX7ShmQWzJWbdhOWA+vzfg8GOB3yAHOXj4dmE7IPRnCINYcAvJX/IR43VgUDCIbW3vz9nwY2SIvDseu8jmeCNOR9GFO4MmYI4lFAVSSglsTDSZJ4q2JoW38jdC2FnqK09ucx+npSdM7j9PbdI3TO3EWdFi0QYdtzmGWeV5ZXuUcHoMOj4mGVzmHg0MK4iHncHuRc7goPa9pfnIOZdBhri7o8DFXCZQJE95/BlAe8ikPCZTBRQIlfARlf3AypuJkTMXJmIqTMRUnYypOxlScjKk4GVNxMqbiZEzFyZiKVTL/APt0d44fmPwOAAAAAElFTkSuQmCC" />
            <img alt="facebook" />
            <img alt="youtube" /> */}
        </div>
    )
}


const Topbar = () => {
  return (
    <div className="w-full flex justify-between p-8">
        <div>
            <img
               src="https://www.gruhkhoj.com/media/images/user-logo/GRUHKHOJ.jpg"
               alt="logo" 
               height={75}
               width={75}
            />

        </div>
        <div className="">
            <Contacts />
        </div>
    </div>
  )
}

export default Topbar