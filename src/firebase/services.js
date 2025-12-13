import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp
} from "firebase/firestore";
import { db } from "./config";

//   === CREDITS ===
/**
 * Obtiene todos los créditos desde Firestore
 * @returns {Promise<Array>} Lista de créditos con id
 */
export const fetchCredits = async () => {
    try {
        const creditsCollection = collection(db, "credits");
        const creditsSnapshot = await getDocs(creditsCollection);
        const creditsList = creditsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return creditsList;
    } catch (error) {
        console.error("Error al obtener créditos:", error);
        
        return [];
    }
};


//   === SOLICITUDES ===

/**
 * Obtiene todas las solicitudes desde Firestore
 * @returns {Promise<Array>} Lista de solicitudes ordenadas por fecha (más recientes primero)
 */
export const fetchSolicitudes = async () => {
    try {
        const solicitudesCollection = collection(db, "solicitudes");
        const q = query(solicitudesCollection, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error al obtener solicitudes:", error);
        throw new Error("No se pudieron cargar las solicitudes");
    }
};

/**
 * Crea una nueva solicitud en Firestore
 * @param {Object} data - Datos de la solicitud
 * @returns {Promise<string>} ID del documento creado
 */
export const createSolicitud = async (data) => {
    try {
        const solicitudesCollection = collection(db, "solicitudes");
        const docRef = await addDoc(solicitudesCollection, {
            ...data,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error al crear solicitud:", error);
        throw new Error("No se pudo guardar la solicitud");
    }
};

/**
 * Actualiza una solicitud existente en Firestore
 * @param {string} id - ID del documento a actualizar
 * @param {Object} data - Nuevos datos de la solicitud
 * @returns {Promise<void>}
 */
export const updateSolicitud = async (id, data) => {
    try {
        const solicitudDoc = doc(db, "solicitudes", id);
        await updateDoc(solicitudDoc, {
            ...data,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error al actualizar solicitud:", error);
        throw new Error("No se pudo actualizar la solicitud");
    }
};

/**
 * Elimina una solicitud de Firestore
 * @param {string} id - ID del documento a eliminar
 * @returns {Promise<void>}
 */
export const deleteSolicitud = async (id) => {
    try {
        const solicitudDoc = doc(db, "solicitudes", id);
        await deleteDoc(solicitudDoc);
    } catch (error) {
        console.error("Error al eliminar solicitud:", error);
        throw new Error("No se pudo eliminar la solicitud");
    }
};