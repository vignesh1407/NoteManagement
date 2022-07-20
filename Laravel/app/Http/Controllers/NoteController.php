<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use App\Models\Notes;


class NoteController extends Controller
{
    public function index()
    {
        return Notes::all();
    }

    public function getNoteById($id){
        $note = Notes::find($id);
        return response()-> json($note::find($id),200);
    }

public function search_notes(Request $request)
{

    $input = $request -> input('search_notes');
    if($input){
        $query = DB::table('notes')->where('title',"like","%".$input."%")->select('image','title','description')->get();
        if(sizeof($query)>0){
            return response()-> json($query,200);
        }
        else return response()->json(["error" => "Please enter valid title"],404);;
    }
    
    return response()-> json($query,200);
}

   public function store(Request $request)
    {   
        $note = new Notes();
        if($request->hasFile('image')){
            try{
                $uploadPath = "public/image";
                $imageName =$request->file('image')->getClientOriginalName();
                $fileNameWithoutExtension = pathinfo($imageName,PATHINFO_FILENAME);
                $extension = $request->file('image')->getClientOriginalExtension();
                $completeName = str_replace(' ', '_', $fileNameWithoutExtension).'-'.rand().'_'.time().'.'. $extension;
                $path = $request->file('image')->storeAs('public/images/',$completeName);
                $note->image = $completeName;
                $note->title = $request->get('title');
                $note->description = $request->get('description');
                $note-> save();
                return response()->json(["message" => "Updates successfully"],200);
            }catch(Exception $e){
                return response()->json(["error" => "Exception caught"],404);;
            }
        }else{
            $note->image = "defaultImage.png";
            $note->title = $request->get('title');
            $note->description = $request->get('description');
            $note-> save();
            return response()->json(["message" => "Updates successfully with default image"],200);
        }
    }

    public function updateNote(Request $request, $id)
    {
        if(Notes::where('id',$id)->exists()){
            $noteToDelete = Notes::find($id);
            $noteToDelete -> delete();
            $note = new Notes();
            if($request->hasFile('image')){
                try{
                    $uploadPath = "public/image";
                    $imageName =$request->file('image')->getClientOriginalName();
                    $fileNameWithoutExtension = pathinfo($imageName,PATHINFO_FILENAME);
                    $extension = $request->file('image')->getClientOriginalExtension();
                    $completeName = str_replace(' ', '_', $fileNameWithoutExtension).'-'.rand().'_'.time().'.'. $extension;
                    $path = $request->file('image')->storeAs('public/images/',$completeName);
                    $note->image = $completeName;
                    $note->title = $request->get('title');
                    $note->description = $request->get('description');
                    $note-> save();
                    return response()->json(["message" => "Updates successfully"],200);
                }catch(\Exception $e){
                    return $e;
                }
            }
            elseif(!is_null($request->get('image'))){
                $note->image = $request->get('image');
                $note->title = $request->get('title');
                $note->description = $request->get('description');
                $note-> save();
                return response()->json(["message" => "Updates successfully with the given details"],200);
            }
            else{
                $note->image = 'defaultImage.png';
                $note->title = $request->get('title');
                $note->description = $request->get('description');
                $note-> save();
                return response()->json(["message" => "Updates successfully with defauls image"],200);
            }
        }
        else{
            return response()->json(["message" => "Note not found"],404);
        }
    }

    public function destroy($id)
    {
        if(Notes::where('id',$id)->exists()){
            $note = Notes::find($id);
            $note -> delete();
            return response()->json(["message" => "Note deleted successfully"],202);
        }
        else{
            return response()->json(["message" => "Note not found"],404);
        }
    }

    
}
