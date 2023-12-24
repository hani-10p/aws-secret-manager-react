// my-component.js

import React, { useEffect } from 'react';
import { SecretsManager } from 'aws-sdk';
import Amplify from 'aws-amplify';
import awsConfig from './constants.js';

Amplify.configure(awsConfig);

const MyComponent = () => {
  useEffect(() => {
    const secretName = 'your-secret-name';
    
    const getSecret = async () => {
      try {
        const data = await new SecretsManager().getSecretValue({ SecretId: secretName }).promise();
        const secret = JSON.parse(data.SecretString);
        console.log("Secret:", secret);
      } catch (error) {
        console.error("Error retrieving secret:", error);
      }
    };

    getSecret();
  }, []);

  return (
    <div>
      {/* Your React component content */}
    </div>
  );
};

export default MyComponent;

