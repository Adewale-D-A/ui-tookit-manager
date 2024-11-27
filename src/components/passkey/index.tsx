// @ts-nocheck - may need to be at the start of file

import { useCallback, useEffect, useState } from "react";

export default function PassKey() {
  const [enablePasskey, setEnablePasskey] = useState(false);
  const [allowLogin, setAllowLogin] = useState(false);

  // allow passkey creation
  useEffect(() => {
    if (
      window.PublicKeyCredential &&
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
      PublicKeyCredential.isConditionalMediationAvailable
    ) {
      // Check if user verifying platform authenticator is available.
      Promise.all([
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
        PublicKeyCredential.isConditionalMediationAvailable(),
      ]).then((results) => {
        if (results.every((r) => r === true)) {
          setEnablePasskey(true);
          // Display "Create a new passkey" button
        }
      });
    }
  }, []);

  // allow passkey login

  useEffect(() => {
    const handleFunction = async () => {
      // Availability of `window.PublicKeyCredential` means WebAuthn is usable.
      if (
        window.PublicKeyCredential &&
        PublicKeyCredential.isConditionalMediationAvailable
      ) {
        // Check if conditional mediation is available.
        const isCMA =
          await PublicKeyCredential.isConditionalMediationAvailable();
        if (isCMA) {
          // Call WebAuthn authentication
          setAllowLogin(true);
        }
      }
    };
    handleFunction();
  }, []);

  const createPasskey = useCallback(async () => {
    try {
      const publicKeyCredentialCreationOptions = {
        challenge: new Uint8Array([
          // must be a cryptographically random number sent from a server
          0x8c, 0x0a, 0x26, 0xff, 0x22, 0x91, 0xc1, 0xe9, 0xb9, 0x4e, 0x2e,
          0x17, 0x1a, 0x98, 0x6a, 0x73, 0x71, 0x9d, 0x43, 0x48, 0xd5, 0xa7,
          0x6a, 0x15, 0x7e, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0f, 0xef,
        ]).buffer,
        rp: { id: "localhost", name: "ACME Corporation" },
        user: {
          id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
          name: "john78",
          displayName: "John",
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          requireResidentKey: true,
        },
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });
      console.log({ credential });
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const loginPasskey = useCallback(async () => {
    try {
      const abortController = new AbortController();
      const publicKeyCredentialRequestOptions = {
        // Server generated challenge
        challenge: new Uint8Array([
          // must be a cryptographically random number sent from a server
          0x8c, 0x0a, 0x26, 0xff, 0x22, 0x91, 0xc1, 0xe9, 0xb9, 0x4e, 0x2e,
          0x17, 0x1a, 0x98, 0x6a, 0x73, 0x71, 0x9d, 0x43, 0x48, 0xd5, 0xa7,
          0x6a, 0x15, 0x7e, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0f, 0xef,
        ]).buffer,
        // The same RP ID as used during registration
        rpId: "localhost",
      };

      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
        // signal: abortController.signal,
        // Specify 'conditional' to activate conditional UI
        mediation: "conditional",
      });
    } catch (error) {
      console.log({ passkeylogin: error });
    }
  }, []);

  return (
    <div className="w-full">
      <button onClick={() => createPasskey()}>
        {enablePasskey ? "Create" : "Not available"}
      </button>
      <button onClick={() => loginPasskey()}>
        {allowLogin ? "Login" : "Not available"}
      </button>
    </div>
  );
}
