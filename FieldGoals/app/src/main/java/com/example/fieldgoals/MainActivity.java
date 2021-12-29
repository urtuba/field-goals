package com.example.fieldgoals;


import androidx.appcompat.app.AppCompatActivity;

import java.util.HashMap;
import java.util.Map;


import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.Spinner;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    private String[] quarters = {"All", "1", "2", "3", "4"};
    private Spinner spinnerQuarters;
    private ArrayAdapter<String> dataAdapterForQuarters;
    private CheckBox player1_checkbox;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        spinnerQuarters = (Spinner) findViewById(R.id.quarter_spinner);
        dataAdapterForQuarters = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_dropdown_item, quarters);

        spinnerQuarters.setAdapter(dataAdapterForQuarters);
        player1_checkbox = (CheckBox) findViewById(R.id.checkbox_player1);

        player1_checkbox.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // validating if the text field is empty or not.
                Log.d("MyApp", "Checkbox reached");
                // calling a method to post the data and passing our name and job.
                postDataUsingVolley("Wizards", "Nets");
            }
        });
        //postDataUsingVolley("Wizards", "Nets");

    }

    private void postDataUsingVolley(String team1, String team2) {
        // url to post our data
        String url = "http://10.0.2.2:3000/game";

        // creating a new variable for our request queue
        RequestQueue queue = Volley.newRequestQueue(MainActivity.this);

        // on below line we are calling a string
        // request method to post the data to our API
        // in this we are calling a post method.
        StringRequest request = new StringRequest(Request.Method.POST, url, new com.android.volley.Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                // inside on response method we are
                // hiding our progress bar
                // and setting data to edit text as empty
                Log.d("MyApp", "1");
                try {
                    // on below line we are passing our response
                    // to json object to extract data from it.
                    Log.d("MyApp","Request sent00");
                    JSONObject respObj = new JSONObject(response);
                    Log.d("MyApp", respObj.toString());
                    // below are the strings which we
                    // extract from our json object.
                    JSONObject data = respObj.getJSONObject("data");
                    String game = data.getString("gameId");
                    TextView gameId = (TextView) findViewById(R.id.team1_name);

                    gameId.setText(respObj.toString());
                    //Log.d("MyApp",game);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new com.android.volley.Response.ErrorListener() {

            public void onErrorResponse(VolleyError error) {
                // method to handle errors.
                Log.d("MyApp", "2");
            }
        }) {
            @Override
            protected Map<String, String> getParams() {
                // below line we are creating a map for
                // storing our values in key and value pair.
                Map<String, String> params = new HashMap<String, String>();
                Log.d("MyApp", "3");
                // on below line we are passing our key
                // and value pair to our parameters.
                params.put("team1Name", team1);
                params.put("team2Name", team2);

                // at last we are
                // returning our params.
                return params;
            }
        };
        // below line is to make
        // a json object request.
        queue.add(request);
    }

}