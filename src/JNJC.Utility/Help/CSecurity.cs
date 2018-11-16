using System;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace JNJC.Utility.Help
{
    public class CSecurity
    {
        private byte[] FIV;
        private byte[] FKEY;

        public CSecurity()
        {
            this.DefaultInit();
        }

        /// <summary>
        /// 将指定的字符串进行MD5加密
        /// </summary>
        /// <param name="str">要加密的字符串</param>
        /// <returns>生成的密文</returns>
        public string Md5(string str)
        {
            Encoder enc = System.Text.Encoding.Unicode.GetEncoder();
            byte[] unicodeText = new byte[str.Length * 2];
            enc.GetBytes(str.ToCharArray(), 0, str.Length, unicodeText, 0, true);
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] result = md5.ComputeHash(unicodeText);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                sb.Append(result[i].ToString("X2"));
            }
            return sb.ToString();
        }

        /// <summary>
        /// 默认键值和初始向量
        /// </summary>
        private void DefaultInit()
        {
            byte[] IV = { 155, 103, 246, 8, 36, 99, 234, 36 };
            byte[] key = { 142, 16, 93, 156, 78, 4, 218, 132 };
            FIV = IV;
            FKEY = key;
        }

        /// <summary>
        /// 采用标准 64位 DES 算法加密
        /// </summary>
        /// <param name="strText">要加密的字符串</param>
        /// <returns>返回加密后的字符串</returns>
        public string Encrypt(string strText)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(FKEY, FIV), CryptoStreamMode.Write);
            StreamWriter sw = new StreamWriter(cs);
            sw.Write(strText);
            sw.Flush();
            cs.FlushFinalBlock();
            ms.Flush();
            return Convert.ToBase64String(ms.GetBuffer(), 0, Convert.ToInt32(ms.Length));
        }


        /// <summary>
        /// 标准64位DES解密
        /// </summary>
        /// <param name="strText">要解密的字符串</param>
        /// <returns>返回解密后的字符串</returns>
        public string Decrypt(string strText)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            byte[] inputByteArray = Convert.FromBase64String(strText);
            MemoryStream ms = new MemoryStream(inputByteArray);
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(FKEY, FIV), CryptoStreamMode.Read);
            StreamReader sr = new StreamReader(cs);
            return sr.ReadToEnd();
        }

    }
}
