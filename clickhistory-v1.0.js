$(document).ready(function(){
  async function pushData() {
      const projectId = 'ik-marketing-data';
      const datasetId = 'Marketing_data_new_logic';
      const tableId = 'Leads_click_history';

      var clickhistory = read_cookie("v_latest");
    
      const rows = [
        { 
          utm_source: clickhistory['utm_source'],
          utm_medium: clickhistory['utm_medium'],
          utm_campaign: clickhistory['utm_campaign'],
          utm_adset: clickhistory['utm_adset'],
          utm_content: clickhistory['utm_content'],
          utm_term: clickhistory['utm_term'],
          timestamp: clickhistory['timestamp'],
          ip: clickhistory['ip'],
          region: clickhistory['region'],
          landing_page: clickhistory['landing_page'],
          userAgent: clickhistory['userAgent'],
          city: clickhistory['city'],
          device: clickhistory['device'],
          visitor_id: clickhistory['visitor_id'],
          referrer: clickhistory['referrer']
        }
      ];
  
      try {
        const accessToken = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvqVW11ZY6V55w\nM3XTPkjNJMngH1dzCla+8hsfQ8jcflGvBIJoyrUJ45viKGAzGDiz3ifdNTCiB0tr\nQqiC3mOLyBX99ypIOjoORruam9Un/uuy7SqnvCLCfKGhvqOb57BnJ7VrGSazE50i\nhRHsPCTQICw7bP+gzwSciu/mpGU5YNTmPd31xD2Y+yPJlO88IUfgODtSCbGiFVdc\nHy4+T0RG5TAOM1sRo2TG3LBH1XMgIl9e+hWPOX2EX2NbSrAnaBMt7U5w0SLN5ith\nZFOp8GvgrLSwmvJspCxBBsWryISJW8X/6OErbFNbEXu7QvqhQEO8bhsWQtb1EO5N\nDIXSgJ5nAgMBAAECggEADyXCVwG/XfHm9F9GTnGqhCDN/7Oe2N66suXcYjUi1vtV\nk+AHAX5UCjGZuZt9tX+QiYIjXIyU+wPiBF0lJtPX2wU6pZcbYEsVF9y672QiB2bm\nGvHJ9y40A81iKrkZEVKeADyJBQk62xUFPHrOcYPmMMRKzCe5YLvj9pPMiCOuTuTe\nurb5ZT5S8nfQHb8AdpFBlRyVaoc8Da71Z1XyxHYaJHrx5S6QhitqHt30kEXHn0KX\n7VR0B1kO4Zyqz9+cmx1yZVwwWQhhBfgqZ0m8BWfGIVts1HIvEmvjbR0Lb2B7xni2\ntcya8/TNpYW9ipN1RWeuFs25ZD99llLPUFm46GVgcQKBgQDifLHDCuO+m4GLNqsB\nWzlvipa73XvW2tXW+mXV8ZyIBaaCe4/Rn38/7B+JIQ+WXbSQuz74YFbxyqZRo/7s\n5K4qxr8PsL0RadF+9UxaKNJJitC5fUYcBRo6EsXywePgdCfH7u+iyARQHdA8ZVUa\nNsx+t74NAxGOFQ+qux79m/aFiwKBgQDGjSpvd0Gby24vMrVXt3Ri16Gvc71NOPaU\nyH3Y9eVh7rDgAAAFSldZVAQd9eUQJFNUNv74h7ZiSrNIK9DrkvapMH5JYrMBMDRt\nJi0GUVJHfWFVSoI/vhtsWiRKdC4A31XiDFqaQnCL/1f/7tBCCp3j82RWGgm7IKyK\nfGi/ttA+FQKBgAF6pv6LF6mrAlGSbdN4cQuVcB6R97kTfMoGoJuhFFCfGNNJU0sf\nK4mTVTFkEeH9gqxfTK36kxbJKAToeUW6yJhm6+CCWvm+IywdFf6Qva7VRT+w3cBZ\nGC7A6KIJOh/BInFf0hjSDZUoXK/ISaH+MZ+yO3+CQZ8X7B5FUpJ9bkK5AoGBAJaT\nFfyEf3AMPdpzZU1JZm1TRF4Psx8uNOouhioUiUnUv7SQq3NXppiq+5hRE89DDSLP\ntlt6aFlwdzgjaoRM5tz2Vr+Gp2QeT5P7IKgq4fAvaLJLGC4JGTj5v43rP7wPo00T\nu15DRqEVG4KPdMaw0H6/5XbatkiAhflcUgAaPyDlAoGBAJ5+iCOA7IiNdt3+tR7h\nOsKQEUXhZ+2rYtpzS6rDDpBu5S5QGhvVHco4mgfuckuv8sQHzbjQ3TLqZ96HDg/L\nNpTr4ZPcH0PUG/Jtxrx9v3uJwcADz9JFJLmq4Rib3hSOmsIBCYQJWiw0PlH5qnc2\n7dvAJFDaS1T1ZS+PjpKTQNUK\n-----END PRIVATE KEY-----\n",
        const url = `https://www.googleapis.com/bigquery/v2/projects/${projectId}/datasets/${datasetId}/tables/${tableId}/insertAll`;
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rows }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to push data: ${response.status} - ${response.statusText}`);
        }
  
        console.log('Data pushed successfully!');
      } catch (error) {
        console.error('Error pushing data:', error);
      }
    }
});
