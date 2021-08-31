package com.acgameshyd.oneg

import com.google.firebase.firestore.PropertyName

data  class CustomList (
@PropertyName("images")val images:List<String>?=null
)
