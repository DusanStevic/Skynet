package com.tim18.skynet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.tim18.skynet.payload.UploadFileResponse;
import com.tim18.skynet.service.ReservationService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
public class FileController {

    @Autowired
    private ReservationService fileStorageService;
   
    
    @PostMapping(value="/api/uploadFile", produces = MediaType.APPLICATION_JSON_VALUE)
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
    	/*
    	String fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();
        
        System.out.println(fileDownloadUri);
        fileName = "addedImages/"+fileName;
        */
        return null;
    }

    @PostMapping("/api/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        /*
    	return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file))
                .collect(Collectors.toList());
    	*/
    	return null;
    }

    @GetMapping("/api/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
    	/*
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
                */
    	return null;
    }
}
