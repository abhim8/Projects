package com.acgameshyd.oneg.models

import android.app.Activity
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.media.MediaPlayer
import android.view.LayoutInflater
import android.widget.TextView
import com.airbnb.lottie.LottieAnimationView
import com.acgameshyd.onega.GameHome

import com.acgameshyd.oneg.MainGame
import com.acgameshyd.oneg.R
import com.acgameshyd.oneg.ICONS


import com.google.android.gms.tasks.Task
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.firebase.auth.ktx.auth
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase


class GameLogic(
    private val boardSize: BoardSize,
    private  var custimgs: List<String>?
) {


    val cards:List<Mcard>
    var nopairsfound=0
    var flipped=0
    var flippedindex:Int?=null
    init{if(custimgs==null){
    var selectedimg= ICONS.shuffled().take(boardSize.getnummpair())
    var randimgs=(selectedimg+selectedimg).shuffled()
      cards=     randimgs.map {
        Mcard(it)
    }}
        else{

        var randimgs=(custimgs!! + custimgs!!).shuffled()
        cards=     randimgs.map {
            Mcard(it.hashCode(),it, false, false)
        }
    }
    }
    fun flip(context: Context,position: Int):Boolean {
        var play=MediaPlayer.create(context,  R.raw.flip)
        play.start()
        flipped++
        var card=cards[position]
        var foundm=false
        if(flippedindex==null){
            restore()
            flippedindex=position
        }
        else{
              foundm=found(flippedindex!!,position,context)
            flippedindex=null
        }
        card.isUp=! card.isUp

return foundm
    }

    private fun found(flippedindex: Int, position: Int,context: Context):Boolean {
if( cards[flippedindex].identifier==cards[position].identifier){cards[flippedindex].isMatch=true
    cards[position].isMatch=true
    nopairsfound++
if(haveWon()){
    var play=MediaPlayer.create(context,  R.raw.win)
    play.start()
    var v=LayoutInflater.from(context).inflate(R.layout.won_infon,null)
  var scoretoadd=when(nopairsfound){
      4->50-(flipped/2)
      9->100-(flipped/2)
      else->150-(flipped/2)
  }
    var base=when(nopairsfound){
        4->50
        9->100
        else->150
    }
    adduserscoretodb(scoretoadd)
    v.findViewById<TextView>(R.id.scorecal).text="$base-${flipped/2}=$scoretoadd"
    v.    findViewById<LottieAnimationView>(R.id.av_from_code).playAnimation()

    MaterialAlertDialogBuilder(context).setView(v).setNegativeButton("GO TO HOME",DialogInterface.OnClickListener{dialogInterface, i ->
        dialogInterface.dismiss()
        (context as Activity).finish()
        val i=Intent(context, GameHome::class.java)
        context.startActivity(i)

    }).setPositiveButton("REPLAY",DialogInterface.OnClickListener{dialogInterface, i ->
        dialogInterface.dismiss()
        var levell=when(nopairsfound){
            4->"easy"
            9->"medium"
            else->"hard"
        }
        (context as Activity).finish()
        val i=Intent(context, MainGame::class.java)
        i.putExtra("level",levell)
        context.startActivity(i)
    }).show()

}
    return true}
        else{

    return false
        }

    }

    private fun adduserscoretodb(scoretoadd: Int) {
         var uid=Firebase.auth.currentUser?.uid

  Firebase.firestore.collection("users").document(uid.toString()).get().addOnCompleteListener { task: Task<DocumentSnapshot> ->

      if(task.isComplete){
        (task.addOnSuccessListener { DocumentSnapshot->
            var ps=   DocumentSnapshot.getLong("score")?.toInt()
            Firebase.firestore.collection("users").document(uid.toString()).update("score",scoretoadd+ ps!!)
              return@addOnSuccessListener
               })
      }
  }

    }

    private fun restore() {
         for(card: Mcard in cards ){
             if(!card.isMatch)
                  card.isUp=false

         }
    }

    fun haveWon(): Boolean {
        return  nopairsfound==boardSize.getnummpair()

    }

    fun isFadeup(position: Int): Boolean {

return  cards[position].isUp
    }

    fun mm(): Int {
return  flipped/2
    }
}