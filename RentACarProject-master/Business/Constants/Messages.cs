using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Business.Constants
{
    public static class Messages
    {
        public static string Added = "Ekleme işlemi yapıldı";
        public static string Deleted="Silme işlemi yapıldı.";
        public static string Updated="Güncelleme işlemi yapıldı.";
        public static string Listed="Listeleme işlemi yapıldı.";
        public static string Get="Detay getirme işlemi yapıldı.";
        public static string ErrorAdded = "Ekleme işlemi yapılamadı.";
        public static string ErrorDeleted = "Silme işlemi yapılamadı.";
        public static string ErrorUpdated = "Güncelleme işlemi yapılamadı.";
        public static string ErrorListed = "Listeleme işlemi yapılamadı.";
        public static string ErrorGet = "Detay getirme işlemi yapılamadı.";        
        public static string AuthorizationDenied="Yetki Yok";
        public static string UserNotFound="Kullanıcı Bulunamadı";
        public static string UserRegistered="userRegistered";
        public static string PasswordError= "Şifre Hatalı";
        public static string SuccessfulLogin= "Giriş Başarılı";
        public static string UserAlreadyExists= "Bu mail ile kullanıcı zaten bulunmaktadır.";
        public static string AccessTokenCreated= "AccessTokenCreated";
        public static string Rented = "Kiralama işlemi yapıldı.";
    }
}
