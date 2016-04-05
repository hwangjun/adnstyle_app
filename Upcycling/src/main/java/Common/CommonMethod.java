package Common;

import java.math.BigInteger;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommonMethod{
	private static final Logger logger = LoggerFactory.getLogger(CommonMethod.class);
	/* string encoding */
	public static String encoding(String pw) {
		String sEnc = pw;
		
		try
		{
			if( sEnc != null && sEnc.trim().length() > 0 )
			{
				byte[] secretkey = "cleantopia _ msg".getBytes(); // 16bytes
				
				// Init
				SecretKeySpec keySpec = new SecretKeySpec(secretkey, "AES");
				
				// Encrypt
				Cipher encrypter = Cipher.getInstance("AES/ECB/PKCS5Padding");
				encrypter.init(Cipher.ENCRYPT_MODE, keySpec);
				byte[] encrypted = encrypter.doFinal(sEnc.getBytes());
				
				// bytes -> hex
				sEnc = new BigInteger(encrypted).toString(16);					
			}
		} catch (Exception e) {
			logger.debug("encoding Exception : ", e);
		}
		return sEnc;
	}
	
	/* string decoding */
	public static String decoding(String pw) {
		String sEnc = pw;
		 
		if(sEnc == null || "".equals(sEnc)) return "";
		try
		{
			byte[] secretkey = "cleantopia _ msg".getBytes(); // 16bytes
			 
			// Init
			SecretKeySpec keySpec = new SecretKeySpec(secretkey, "AES");
			 
			// Decrypt
			Cipher decrypter = Cipher.getInstance("AES/ECB/PKCS5Padding");
			decrypter.init(Cipher.DECRYPT_MODE, keySpec);
			 
			// hex -> bytes
			byte[] encrypted = new BigInteger(sEnc,16).toByteArray();
			
			byte[] decrypted = decrypter.doFinal(encrypted);
			 
			sEnc = new String(decrypted);
			} catch (Exception e) {
				logger.debug("decoding Exception : ", e);
			}
			return sEnc;
		}

}